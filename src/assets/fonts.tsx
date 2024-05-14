import localFont from "next/font/local";
import { Inter, Paytone_One, DM_Sans } from "next/font/google";

export const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
  preload: true,
});

export const dmSans = DM_Sans({
  variable: "--font-dm-sans",
  subsets: ["latin"],
  display: "swap",
  preload: true,
});

export const paytone = Paytone_One({
  variable: "--font-paytone",
  subsets: ["latin"],
  weight: "400",
  display: "swap",
  preload: true,
});

export const fontMapper = {
  "font-dm-sans": dmSans.variable,
  "font-inter": inter.variable,
  "font-paytone": paytone.variable,
};
