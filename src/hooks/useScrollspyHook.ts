import { useState, useRef, useEffect, useCallback } from 'react';

interface Section {
    id: string;
    label: string;
}

interface UseScrollspyOptions {
    sections: Section[];
    rootMargin?: string;
    thresholds?: number[];
    offset?: number;
}

interface UseScrollspyReturn {
    activeSection: string;
    sectionRefs: React.MutableRefObject<(HTMLElement | null)[]>;
    scrollToSection: (id: string, customOffset?: number) => void;
}

interface VisibleSection {
    ratio: number;
    entry: IntersectionObserverEntry;
}

export const useScrollspy = ({
    sections,
    rootMargin = "-20% 0px -35% 0px",
    thresholds = [0, 0.25, 0.5, 0.75, 1],
    offset = 80
}: UseScrollspyOptions): UseScrollspyReturn => {
    const [activeSection, setActiveSection] = useState<string>(sections[0].id);
    const sectionRefs = useRef<(HTMLElement | null)[]>([]);
    const observerRef = useRef<IntersectionObserver | null>(null);
    const visibleSectionsRef = useRef(new Map<string, VisibleSection>());

    const handleIntersection = useCallback((entries: IntersectionObserverEntry[]) => {
        entries.forEach((entry) => {
            visibleSectionsRef.current.set(entry.target.id, {
                ratio: entry.intersectionRatio,
                entry
            });
        });

        // Find the most visible section
        let maxRatio = 0;
        let maxSection = activeSection;

        visibleSectionsRef.current.forEach((value, key) => {
            if (value.ratio > maxRatio) {
                maxRatio = value.ratio;
                maxSection = key;
            }
        });

        if (maxRatio > 0) {
            setActiveSection((prevSection) => {
                // Only update if the section has changed
                return prevSection !== maxSection ? maxSection : prevSection;
            });
        }
    }, [activeSection]);

    useEffect(() => {
        // Cleanup previous observer if it exists
        if (observerRef.current) {
            observerRef.current.disconnect();
            visibleSectionsRef.current.clear();
        }

        // Create new observer
        observerRef.current = new IntersectionObserver(handleIntersection, {
            root: null,
            rootMargin,
            threshold: thresholds,
        });

        // Observe all sections
        sectionRefs.current.forEach((section) => {
            if (section) {
                observerRef.current?.observe(section);
            }
        });

        return () => {
            if (observerRef.current) {
                observerRef.current.disconnect();
                visibleSectionsRef.current.clear();
            }
        };
    }, [handleIntersection, rootMargin, thresholds]);

    const scrollToSection = useCallback((id: string, customOffset?: number) => {
        const section = document.getElementById(id);

        if (section) {
            try {
                const elementPosition = section.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.scrollY - (customOffset ?? offset);

                window.scrollTo({
                    top: offsetPosition,
                    behavior: "smooth"
                });
            } catch (error) {
                console.error('Error scrolling to section:', error);

                // Fallback to simpler scroll if smooth scroll fails
                section.scrollIntoView();
            }
        }
    }, [offset]);

    return {
        activeSection,
        sectionRefs,
        scrollToSection,
    };
};