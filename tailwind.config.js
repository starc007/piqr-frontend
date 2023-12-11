/** @type {import('tailwindcss').Config} */
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
      colors: {
        // primary: "#2efb79", //green
        // primary: "#00DFA2",
        primary: "#2E98FB",
        secondary: "#2efb79",
        // secondary: "#FFC124",
        // secondary: "#FD8C61",
        // tertiary: "#CE65FF",
        dark: "#121212",
        // yellow: "#FFB320",
        // dark: "#0D1619",
        // primBlue: "#2E98FB",
        lightYellow: "#FEE0AA",
        // lightGray: "#FAFAFA",
        lightGray: "#F8F7F3",
        lightGray2: "#E4E2DE",
        secondGray: "#ECECEC",
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
  ],
};
