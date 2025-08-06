// lib/streamChatFromDocument.ts
// import Cookies from "js-cookie";

// export async function streamChatFromDocument(
//   {
//     query,
//     document_id,
//     session_id,
//   }: {
//     query: string;
//     document_id: string;
//     session_id: string;
//   },
//   onChunk: (chunk: string) => void
// ) {
//   const accessToken = Cookies.get("access_token");

//   const headers = new Headers();
//   headers.set("Content-Type", "application/json");
//   headers.set("Accept", "*/*");
//   if (accessToken) {
//     headers.set("Authorization", `Bearer ${accessToken}`);
//   }

//   const response = await fetch(
//     "https://webapp.lexanalytics.ai/api/chatbot/chat",
//     {
//       method: "POST",
//       headers,
//       body: JSON.stringify({ query, document_id, session_id }),
//     }
//   );

//   if (!response.ok || !response.body) {
//     throw new Error("Failed to connect to chat stream.");
//   }

//   const reader = response.body.getReader();
//   const decoder = new TextDecoder("utf-8");

//   let partial = "";

//   while (true) {
//     const { done, value } = await reader.read();
//     if (done) break;

//     partial += decoder.decode(value, { stream: true });

//     // Stream word-by-word
//     const words = partial.split(/\s+/);
//     partial = words.pop() ?? ""; // keep partial word

//     for (const word of words) {
//       onChunk(word + " ");
//     }
//   }

//   if (partial) {
//     onChunk(partial); // last remaining part
//   }
// }

import Cookies from "js-cookie";

export async function streamSSEChatFromDocument(
  {
    query,
    document_id,
    session_id,
  }: {
    query: string;
    document_id: string;
    session_id: string;
  },
  onToken: (token: string) => void,
  onEnd?: (info: { session_id: string; document_id: string }) => void,
  onError?: (err: string) => void
) {
  const accessToken = Cookies.get("access_token");

  const headers = new Headers();
  headers.set("Content-Type", "application/json");
  headers.set("Accept", "text/event-stream");
  if (accessToken) {
    headers.set("Authorization", `Bearer ${accessToken}`);
  }

  const response = await fetch(
    "https://webapp.lexanalytics.ai/api/chatbot/chat",
    {
      method: "POST",
      headers,
      body: JSON.stringify({ query, document_id, session_id }),
    }
  );
  // console.log("streamed respnse", response);
  if (!response.ok || !response.body) {
    throw new Error("Failed to connect to chat stream.");
  }

  const reader = response.body.getReader();
  const decoder = new TextDecoder("utf-8");

  let buffer = "";

  while (true) {
    const { done, value } = await reader.read();
    // console.log("streamed value", value);
    if (done) break;
    const decoded = decoder.decode(value, { stream: true });
    console.log("decoded", decoded);
    buffer += decoded;
    // console.log("buffer", buffer);
    const events = buffer.split("\n\n");
    // buffer = events.pop() || ""; // incomplete chunk stays in buffer

    for (const raw of events) {
      const lines = raw.split("\n");
      // console.log("raw event", raw);
      const eventType = lines
        .find((line) => line.startsWith("event:"))
        ?.split(":")[1]
        ?.trim();
      const dataLine = lines
        .find((line) => line.startsWith("data:"))
        ?.slice(5)
        .trim();

      if (!eventType || !dataLine) continue;

      try {
        const parsed = JSON.parse(dataLine as string);
        if (eventType === "message" && parsed.token) {
          // console.log("streamed token", parsed.token);
          onToken(parsed.token);
        } else if (eventType === "end" && onEnd) {
          onEnd(parsed);
        }
      } catch (err) {
        onError?.("Failed to parse SSE message");
      }
    }
  }
}
