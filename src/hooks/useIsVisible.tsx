"use client";
import { useEffect, useState } from "react";
import useMediaQuery from "./useMediaQuery";

const useIsVisible = (ref: any) => {
  const [isIntersecting, setIntersecting] = useState(false);

  const isMobile = useMediaQuery("(max-width: 480px)");
  const isTablet = useMediaQuery("(max-width: 768px)");
  const isPC = useMediaQuery("(min-width: 768px)");

  const rootMargin: string =
    isMobile || isTablet ? "-10% 0px 10% 0px" : "5% 0px 5% 0px";
  const threshold: number = isMobile || isTablet ? 0.4 : 0.6;

  useEffect(() => {
    const options = {
      root: null, // default, use viewport
      rootMargin,
      threshold, // half of item height
    };

    const observer = new IntersectionObserver(([entry]) => {
      setIntersecting(entry.isIntersecting);
    }, options);

    if (ref.current) {
      observer.observe(ref.current);
    }
    return () => {
      observer.disconnect();
    };
  }, [ref, rootMargin, threshold]);

  return isIntersecting;
};

export default useIsVisible;
