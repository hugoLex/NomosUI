"use client";
import { MutableRefObject, useEffect, useState } from "react";
import useMediaQuery from "./useMediaQuery";

type UseVisibiltyProps = {
  ref: MutableRefObject<HTMLElement | null>;
  options: IntersectionObserverInit | null;
};

const useVisibility = ({ ref, options }: UseVisibiltyProps) => {
  const [isIntersecting, setIntersecting] = useState(false);

  const isMobile = useMediaQuery("(max-width: 480px)");
  const isTablet = useMediaQuery("(max-width: 768px)");
  const isPC = useMediaQuery("(min-width: 768px)");

  useEffect(() => {
    const rootMargin: string =
      isMobile || isTablet ? "-10% 0px 10% 0px" : "5% 0px 5% 0px";
    const threshold: number = isMobile || isTablet ? 0.4 : 0.6;

    const optionsProps = options
      ? options
      : {
          root: null, // default, use viewport
          rootMargin,
          threshold, // half of item height
        };

    const observer = new IntersectionObserver(([entry]) => {
      setIntersecting(entry.isIntersecting);
    }, optionsProps);

    if (ref.current) {
      observer.observe(ref.current);
    }
    return () => observer.disconnect();
  }, [isMobile, isPC, isTablet, options, ref]);

  return isIntersecting;
};

export default useVisibility;
