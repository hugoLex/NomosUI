import localFont from "next/font/local";
import { Inter, Poppins, Rubik } from "next/font/google";

export const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
  preload: true,
});

export const poppins = Poppins({
  variable: "--font-paytone",
  subsets: ["latin"],
  weight: "400",
  display: "swap",
  preload: true,
});

export const rubik = Rubik({
  variable: "--font-rubik",
  subsets: ["latin"],
  display: "swap",
  preload: true,
});

export const fontMapper = {
  "font-rubik": rubik.variable,
  "font-inter": inter.variable,
  "font-paytone": poppins.variable,
};
