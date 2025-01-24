import { GenericObject, PlatformOS } from "@app/types";

export * from "./mention";

export const getPlatformOS = (): PlatformOS | null => {
  const userAgent = window.navigator.userAgent;
  let os: PlatformOS | null = null;

  const Android = /Android/gi.test(userAgent);
  const isIOS = /iPad|iPhone|iPod/.test(userAgent);
  const Linux = /Linux/gi.test(userAgent);
  const MacOS = /Macintosh|Mac|Mac OS|MacIntel|MacPPC|Mac68K/gi.test(userAgent);
  const Windows = /'Win32|Win64|Windows|Windows NT|WinCE/gi.test(userAgent);

  // (/Mac|Mac OS|MacIntel/gi.test(userAgent) && (navigator.maxTouchPoints > 1 || "ontouchend" in document))) && !window.MSStream;

  if (Android) return (os = "Android");

  if (isIOS) return (os = "iOS");

  if (MacOS) return (os = "MacOS");

  if (Linux) return (os = "Linux");

  if (Windows) return (os = "Windows");

  return null;
};

export const escapeRegExp = (text: string) =>
  text.replace(/[.*+-/?^${}()|[\]\\]/g, "\\$&");

export const paginateData = (data: any[], offset: number, limit: number) => {
  if (limit < 0) return data.slice(offset);
  return data.slice(offset, offset + limit);
};

export const getCookie = (name: string = "") => {
  let cookies = document.cookie;
  let cookiestore = {};

  cookies = cookies.split(";");

  if (cookies[0] == "" && cookies[0][0] == undefined) {
    return undefined;
  }

  cookies.forEach(function (cookie) {
    cookie = cookie.split(/=(.+)/);
    if (cookie[0].substr(0, 1) == " ") {
      cookie[0] = cookie[0].substr(1);
    }
    cookiestore[cookie[0]] = cookie[1];
  });

  return name !== "" ? cookiestore[name] : cookiestore;
};

// (name: string) => {
//   let cookie: GenericObject = {};
//   document.cookie.split(";").forEach(function (el) {
//     let split = el.split("=");
//     cookie[split[0].trim()] = split.slice(1).join("=");
//   });
//   return cookie[name];
// };
