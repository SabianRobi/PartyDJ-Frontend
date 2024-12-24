/** @type {import('tailwindcss').Config} */

import flowbite from "flowbite-react/tailwind";
import colors from "tailwindcss/colors";

module.exports = {
  content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}", flowbite.content()],
  theme: {
    extend: {
      colors: {
        // v2 -> v3 migration
        green: colors.emerald,
        yellow: colors.amber,
        purple: colors.violet,
        gray: colors.neutral,
        // Custom colors
        background: "#32404b",
        primary: "#012340",
        secondary: "#0367A6",
        tertiary: "#049DD9",
        orange: "#F28B30",
        oranger: "#F27141",
        error: "#B20000",
        success: "#008B38",
        lightText: "#ffffff",
        darkText: "#000000"
      },
      fontFamily: {
        k2d: ["K2D", "sans-serif"]
      }
    }
  },
  plugins: [flowbite.plugin()]
};
