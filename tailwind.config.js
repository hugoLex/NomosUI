const { fontFamily } = require("tailwindcss/defaultTheme");

// /** @type {import('tailwindcss').Config} */

const dark = {
  0: "#000",
  1: "#1D1B20",
  2: "#4C4D50",
  3: "#979797",
  4: "#232323",
  5: "#5C5C5C",
  6: "#1D1D1D",
  7: "#1B1B1B",
};

const config = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    fontSize: {
      xs: ["0.75rem", "1rem"],
      sm: ["0.875rem", "1.25rem"],
      base: ["1rem", "1.5rem"],
      lg: ["1.25rem", "1.75rem"],
      xx: ["1.5rem", "1.8rem"],
      xl: ["1.8rem", "2.4rem"],
      xxl: ["2.5rem", "3rem"],
      "2xl": ["2.875rem", "3.5rem"],
      "3xl": ["3.5rem", "4.5rem"],
      "4xl": ["4.5rem", "5rem"],
      "8xl": ["6rem", "6.5rem"],
    },
    extend: {
      width: {
        f: "calc(100% - 6rem)",
      },
      fontFamily: {
        rubik: ["var(--font-rubik)", ...fontFamily.sans],
        "dm-sans": ["var(--font-dm-sans)", ...fontFamily.sans],
        inter: ["var(--font-inter)", ...fontFamily.sans],
        paytone: ["var(--font-paytone)", ...fontFamily.sans],
      },
      colors: {
        primary: "#76448A",
        secondary: "#4F0072",
        dark,
        accent: "#6019800A",
        success: "#4BB543",
        "coral-red": "#FF6452",
        "slate-gray": "#6D6D6D",
        "pale-blue": "#F5F6FF",
        "white-400": "rgba(255, 255, 255, 0.80)",
      },
      boxShadow: {
        "3xl": "0 10px 40px rgba(0, 0, 0, 0.1)",
      },

      screens: {
        wide: "1440px",
      },
      backgroundImage: {
        "about-bg1": "url('/about-bg1.svg')",
        "about-bg2": "url('/about-bg2.svg')",
        "border-t": "url('/bg-border.svg')",
        "mockup-fg": "url('/mockup-fg.svg')",
        "mockup-bg": "url('/mockup-bg.svg')",
        "cta-gradient":
          "url('/Oval.svg'), linear-gradient(108.92deg,#4f0072 2.67%,rgba(98, 33, 126, 0.722379) 109.65%,rgba(118, 68, 138, 0.428386) 118.38%,rgba(118, 68, 138, 0) 135.3%) ",
        "cta-gradient2":
          "url('/Oval2.svg'), linear-gradient(108.92deg,#4f0072 2.67%,rgba(98, 33, 126, 0.722379) 109.65%,rgba(118, 68, 138, 0.428386) 118.38%,rgba(118, 68, 138, 0) 135.3%) ",
      },
      backgroundPosition: {
        "right-top-lg": "right  top 230px",
        "right-top-md": "right  top 130px",

        "center-right": "right center",
      },
    },

    animation: {
      "slideIn-left": "slideIn-left .6s ease-in-out forwards var(--delay, 0s)",
      "slide-in-fwd-center":
        "slide-in-fwd-center 0.4s cubic-bezier(0.250, 0.460, 0.450, 0.940) both var(--delay, 0s)",
      pulse: "pulse 1.5s ease-in-out infinite both",
      ping: "ping 1s cubic-bezier(0, 0, 0.2, 1) infinite",
      "slideIn-top":
        "slideIn-top var(--duration, 0.3s) ease-in-out forwards var(--delay, 0s)",
      scaleIn: "scaleIn .8s ease-in-out forwards var(--delay, 0s)",
      "slide-in-b":
        "slide-in-bottom 0.5s cubic-bezier(0.250, 0.460, 0.450, 0.940) both",
      "shake-vertical":
        "shake-vertical var(--duration, 8s)  cubic-bezier(0.455, 0.030, 0.515, 0.955) 0.4s infinite both",
      "spin-right": "spin-right  var(--duration, 8s) linear infinite",
      wiggle:
        "wiggle var(--duration, 1s) ease-in-out infinite var(--delay, 0.3s)",
      "wobble-right": "wobble-right 1.8s  infinite both var(--delay, 0.3s)",
      "wobble-left": " wobble-left 1.8s  infinite both var(--delay, 0.3s)",
    },

    keyframes: {
      ping: {
        "75%, 100%": {
          transform: "scale(2)",
          opacity: 0,
        },
      },
      pulse: {
        from: {
          transform: "scale(1)",
          "transform-origin": "center center",
          "animation-timing-function": "ease-out",
        },
        "10%": {
          transform: "scale(0.91)",
          "animation-timing-function": "ease-in",
        },
        "17%": {
          transform: "scale(0.98)",
          "animation-timing-function": "ease-out",
        },
        "33%": {
          transform: "scale(0.87)",
          "animation-timing-function": "ease-in",
        },
        "45%": {
          transform: "scale(1)",
          "animation-timing-function": "ease-out",
        },
      },
      "slide-in-bottom": {
        "0%": {
          transform: "translateY(100%)",
          opacity: 0,
        },
        "100%": {
          transform: "translateY(0)",
          opacity: 1,
        },
      },
      "slide-in-fwd-center": {
        "0%": {
          transform: "translateZ(-1000px)",
          opacity: 0,
        },
        "100%": {
          transform: "translateZ(0)",
          opacity: 1,
        },
      },
      "slideIn-left": {
        "0%": { opacity: 0, transform: "translateX(-100%)" },
        "100%": { opacity: 1, transform: "translateX(0)" },
      },
      "slideIn-top": {
        "0%": { opacity: 0, transform: "translateY(-100%)" },
        "100%": { opacity: 1, transform: "translateY(0)" },
      },
      scaleIn: {
        "0%": { opacity: 0.5, transform: "scale(0.5)" },
        "100%": { opacity: 1, transform: "scale(1)" },
      },
      "spin-right": {
        "100%": { transform: "rotate(360deg)" },
      },

      wiggle: {
        "0%, 100%": { transform: "rotate(-3deg)" },
        "50%": { transform: "rotate(3deg)" },
      },
      "shake-vertical": {
        "0%,100%": {
          transform: "translateY(0)",
        },
        "10%,30%,50%,70%": {
          transform: "translateY(-8px)",
        },
        "20%,40%,60%": {
          transform: "translateY(8px)",
        },
        "80%": {
          transform: "translateY(6.4px)",
        },
        "90%": {
          transform: "translateY(-6.4px)",
        },
      },
      "wobble-right": {
        "0%,100%": {
          transform: "translateY(0) rotate(0)",
          "transform-origin": "50% 50%",
        },
        "15%": {
          transform: "translateY(-30px) rotate(6deg)",
        },
        "30%": {
          transform: "translateY(15px) rotate(-6deg)",
        },
        "45%": {
          transform: " translateY(-15px) rotate(3.6deg)",
        },
        "60%": {
          transform: "translateY(9px) rotate(-2.4deg)",
        },
        "75% ": {
          transform: "translateY(-6px) rotate(1.2deg)",
        },
      },
      "wobble-left": {
        "0%,100%": {
          transform: "translateY(0) rotate(0)",

          "transform-origin": "50% 50%",
        },
        "15%": {
          transform: "translateY(-30px) rotate(-6deg)",
        },
        "30%": {
          transform: "translateY(15px) rotate(6deg)",
        },
        "45%": {
          transform: "translateY(-15px) rotate(-3.6deg)",
        },
        "60%": {
          transform: "translateY(9px) rotate(2.4deg)",
        },
        "75%": {
          transform: "translateY(-6px) rotate(-1.2deg)",
        },
      },
    },
  },
  plugins: [],
};

export default config;

// module.exports = {
//   presets: [require("@vercel/examples-ui/tailwind")],
//   content: [
//     "./pages/**/*.{js,ts,jsx,tsx}",
//     "./components/**/*.{js,ts,jsx,tsx}",
//     "./node_modules/@vercel/examples-ui/**/*.js",
//   ],
// };

// backgroundImage: {
//   hero: "url('assets/images/collection-background.svg')",
//   card: "url('assets/images/thumbnail-background.svg')",
// },
