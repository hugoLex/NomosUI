import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useCallback } from "react";

// this hook is used to reconstruct url before injecting it back, manipulation of the url can be done using the hook
// you can also get params and paths by calling it

export function UseQueryToggler() {
  const router = useRouter();
  const pathname = usePathname();

  const searchParams = useSearchParams();
  const urlSearchParamsString = new URLSearchParams(searchParams);
  const createQueryString = useCallback(
    (name: string, value: string) => {
      urlSearchParamsString.set(name, value);
      return urlSearchParamsString.toString();
    },
    [searchParams]
  );
  function close(open = "open", param = "false") {
    urlSearchParamsString.set(open, param);

    router.push(`${pathname}?${urlSearchParamsString}`, {
      scroll: false,
    });
  }

  const removeQueryParam = (paramToDelete: string) => {
    // Remove the parameter from the query object
    urlSearchParamsString.delete(paramToDelete);
    // Update the URL without reloading the page
    router.push(
      urlSearchParamsString
        ? `${pathname}?${urlSearchParamsString}`
        : `${pathname}`,
      {
        scroll: false,
      }
    );
  };

  const mobileView = searchParams.get("open");

  return {
    createQueryString,
    searchParams,
    mobileView,
    router,
    pathname,
    urlSearchParamsString,
    close,
    removeQueryParam,
  };
}
