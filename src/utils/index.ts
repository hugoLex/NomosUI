import { PlatformOS } from "@app/types";

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
