/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "node_modules/flowbite-react/lib/esm/**/*.js",
  ],
  theme: {
    extend: {
      colors: {
        background: "#32404b",
        primary: "#012340",
        secondary: "#0367A6",
        tertiary: "#049DD9",
        orange: "#F28B30",
        oranger: "#F27141",
        error: "#B20000",
        success: "#008B38",
        lightText: "#ffffff",
        darkText: "#000000",
      },
    },
  },
  plugins: [require("flowbite/plugin")],
};
