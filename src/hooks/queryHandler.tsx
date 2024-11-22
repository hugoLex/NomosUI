import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useCallback } from "react";

export function UseQueryToggler() {
  const router = useRouter();
  const pathname = usePathname();
  // console.log("this is the path name", pathname);
  const searchParams = useSearchParams();
  const urlString = new URLSearchParams(searchParams);
  const createQueryString = useCallback(
    (name: string, value: string) => {
      // const params = new URLSearchParams(searchParams);
      urlString.set(name, value);
      return urlString.toString();
    },
    [searchParams]
  );
  function close(open = "open", param = "false") {
    // const params = new URLSearchParams(searchParams);
    urlString.set(open, param);
    // router.push(`/overview?open=false`, {
    //   scroll: false,
    // });
    router.push(`${pathname}?${urlString}`, {
      scroll: false,
    });
  }

  const mobileView = searchParams.get("open");

  // console.log(mobileView);
  return {
    createQueryString,
    searchParams,
    mobileView,
    router,
    pathname,
    urlString,
    close,
  };
}
