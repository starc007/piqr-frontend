/** @type {import('tailwindcss').Config} */
import { createThemes } from "tw-colors";

module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",

    // Or if using `src` directory:
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        monaSans: ["var(--font-monaSans)"],
      },

      colors: {
        primary: "#2E98FB",
        secondary: "#2efb79",
        dark: "#121212",
        lightYellow: "#FEE0AA",
        lightGray: "#F8F7F3",
        lightGray2: "#E4E2DE",
        // secondGray: "#F6F9F9",
        secondGray: "#F2F2F2",
      },
      animation: {
        marquee: "marquee 10s linear infinite",
        marquee2: "marquee2 10s linear infinite",
      },
      keyframes: {
        marquee: {
          "0%": { transform: "translateX(0%)" },
          "100%": { transform: "translateX(-100%)" },
        },
        marquee2: {
          "0%": { transform: "translateX(100%)" },
          "100%": { transform: "translateX(0%)" },
        },
      },
    },
  },
  plugins: [
    require("@headlessui/tailwindcss"),
    require("@tailwindcss/typography"),

    createThemes({
      light: {},
      dark: {},
    }),
  ],
};
