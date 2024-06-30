import React, { useLayoutEffect } from "react";

const usePrefixClassOnScrollElement = (
  selector: string,
  prefixClass: string
): void => {
  useLayoutEffect(() => {
    const affixElement = (evt: Event) => {
      const el = document.querySelector<HTMLElement>(selector);

      if (el) {
        const y = el.offsetTop;
        const height = el.offsetHeight;

        const maxHeight = y + height;
        const isVisible =
          y < window.pageYOffset + window.innerHeight &&
          maxHeight >= window.pageYOffset;

        !isVisible
          ? el.classList.add(prefixClass)
          : el.classList.remove(prefixClass);
      }
    };

    window.addEventListener("scroll", affixElement);
    return () => {
      window.removeEventListener("scroll", affixElement);
    };
  }, [prefixClass, selector]);
};

export default usePrefixClassOnScrollElement;
