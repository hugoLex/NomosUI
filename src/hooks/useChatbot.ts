// hooks/useChatbot.ts
import { useState, useRef, useCallback, use, useEffect } from 'react';
import useQueryToggler from './useQueryHandler';

export interface ChatMessage {
    id: string;
    type: 'user' | 'assistant' | 'progress';
    content: string;
    timestamp: Date;
    documentId?: string;
}

export interface ChatSession {
    sessionId: string;
    documentId: string;
    documentTitle?: string;
    messages: ChatMessage[];
}

export const useChatbot = () => {
    const { searchParams } = useQueryToggler();
    // for testing purposes, I am using a static list of documents
    const docId = "cca34a12-17a2-464c-a4a6-0f3b3a93e4c6";
    // const docId = searchParams.get("documentId")
    const [sessions, setSessions] = useState<Record<string, ChatSession>>({});
    const [isStreaming, setIsStreaming] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const eventSourceRef = useRef<EventSource | null>(null);

    // Generate unique IDs
    const generateId = () => Math.random().toString(36).substr(2, 9);
    const generateSessionId = () => `session-${Date.now()}-${generateId()}`;

    // Get or create session for a document
    const getSession = useCallback((documentId: string): ChatSession => {
        const sessionKey = documentId;
        if (!sessions[sessionKey]) {
            const newSession: ChatSession = {
                sessionId: generateSessionId(),
                documentId,
                messages: []
            };
            setSessions(prev => ({ ...prev, [sessionKey]: newSession }));
            return newSession;
        }
        return sessions[sessionKey];
    }, [sessions]);

    // Add message to session
    const addMessage = useCallback((sessionKey: string, message: Omit<ChatMessage, 'id' | 'timestamp'>) => {
        const newMessage: ChatMessage = {
            ...message,
            id: generateId(),
            timestamp: new Date()
        };

        setSessions(prev => ({
            ...prev,
            [sessionKey]: {
                ...prev[sessionKey],
                messages: [...(prev[sessionKey]?.messages || []), newMessage]
            }
        }));

        return newMessage.id;
    }, []);

    // Update streaming message
    const updateMessage = useCallback((sessionKey: string, messageId: string, content: string) => {
        setSessions(prev => ({
            ...prev,
            [sessionKey]: {
                ...prev[sessionKey],
                messages: prev[sessionKey].messages.map(msg =>
                    msg.id === messageId ? { ...msg, content } : msg
                )
            }
        }));
    }, []);

    // Send message with streaming
    const sendMessage = useCallback(async (documentId: string, query: string) => {
        if (isStreaming) return;

        setIsStreaming(true);
        setError(null);

        const session = getSession(documentId);
        const sessionKey = documentId;

        // Add user message
        addMessage(sessionKey, {
            type: 'user',
            content: query,
            documentId
        });

        // Add initial assistant message
        const assistantMessageId = addMessage(sessionKey, {
            type: 'assistant',
            content: '',
            documentId
        });

        try {
            // Close any existing connection
            if (eventSourceRef.current) {
                eventSourceRef.current.close();
            }

            // Prepare request
            const requestBody = {
                query,
                document_id: documentId,
                session_id: session.sessionId
            };

            // Start SSE connection
            const response = await fetch('https://webapp.lexanalytics.ai/api/chatbot/chat', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(requestBody)
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            if (!response.body) {
                throw new Error('No response body');
            }

            // Handle streaming response
            const reader = response.body.getReader();
            const decoder = new TextDecoder();
            let buffer = '';
            let accumulatedContent = '';

            while (true) {
                const { done, value } = await reader.read();

                if (done) break;

                buffer += decoder.decode(value, { stream: true });
                const lines = buffer.split('\n');
                buffer = lines.pop() || '';

                for (const line of lines) {
                    if (line.startsWith('data: ')) {
                        try {
                            const data = JSON.parse(line.slice(6));

                            if (data.token) {
                                accumulatedContent += data.token;
                                updateMessage(sessionKey, assistantMessageId, accumulatedContent);
                            }
                        } catch (e) {
                            console.warn('Failed to parse SSE data:', e);
                        }
                    } else if (line === 'event: end') {
                        // Stream completed
                        break;
                    } else if (line === 'event: error') {
                        throw new Error('Server error during streaming');
                    }
                }
            }

        } catch (err) {
            const errorMessage = err instanceof Error ? err.message : 'An error occurred';
            setError(errorMessage);

            // Update the message with error
            updateMessage(sessionKey, assistantMessageId, `❌ Error: ${errorMessage}`);
        } finally {
            setIsStreaming(false);
        }
    }, [isStreaming, getSession, addMessage, updateMessage]);

    // Clear conversation
    const clearConversation = useCallback(async (documentId: string) => {
        const session = sessions[documentId];
        if (!session) return;

        try {

            //   const response = await fetch(
            //     "https://webapp.lexanalytics.ai/api/chatbot/chat",
            //     {
            //       method: "POST",
            //       headers,
            //       body: JSON.stringify({ query, document_id, session_id }),
            //     }
            //   );
            await fetch('https://webapp.lexanalytics.ai/api/chatbot/clear', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    session_id: session.sessionId,
                    document_id: documentId
                })
            });

            // Clear local state
            setSessions(prev => ({
                ...prev,
                [documentId]: {
                    ...prev[documentId],
                    messages: []
                }
            }));

        } catch (err) {
            console.error('Failed to clear conversation:', err);
        }
    }, [sessions]);

    // Cleanup
    const cleanup = useCallback(() => {
        if (eventSourceRef.current) {
            eventSourceRef.current.close();
            eventSourceRef.current = null;
        }
    }, []);

    useEffect(() => {

        if (docId) {
            // Load sessions from localStorage on mount 
            const storedSessions = localStorage.getItem(docId);
            const parsedSessions = storedSessions ? JSON.parse(storedSessions) : null;
            if (parsedSessions?.messages?.length > 1) {
                console.log("Loading sessions from localStorage for documentId now:", docId, parsedSessions);
                setSessions({ [docId]: parsedSessions });
            }
        }

    }
        , [docId]);
    useEffect(() => {
        // Save sessions to localStorage whenever sessions change
        const tempSession = Object?.values(sessions)[0];
        if (docId && tempSession?.messages?.length > 1) {
            // if (docId && [0]?.messages?.length > 1) {
            // Save sessions to localStorage whenever sessions change
            console.log("Saving sessions to localStorage:", tempSession);
            localStorage.setItem(docId, JSON.stringify(tempSession))
        }
    }
        , [docId, sessions]);

    // console.log("Saving sessions to localStorage:", Object?.values(sessions)[0]);

    return {
        sessions,
        isStreaming,
        error,
        sendMessage,
        clearConversation,
        getSession,
        cleanup
    };
};