import localFont from "next/font/local";
import {
  Inter,
  Poppins,
  Rubik,
  Roboto,
  Playfair,
  Cabin,
  Gilda_Display,
} from "next/font/google";

export const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
  preload: true,
});
export const cabin = Cabin({
  variable: "--font-cabin",
  weight: ["400", "500", "600"],
  subsets: ["latin"],
  display: "swap",
  preload: true,
});

export const gilda_Display = Gilda_Display({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["400"],
  display: "swap",
  preload: true,
});
export const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700"],
  display: "swap",
  preload: true,
});
export const playfair = Playfair({
  variable: "--font-playfair",
  subsets: ["latin"],
  weight: ["300", "400", "600", "700"],
  display: "swap",
  preload: true,
});
export const roboto = Roboto({
  variable: "--font-roboto",
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
  "font-poppins": poppins.variable,
  "font-playfair": playfair.variable,
};
