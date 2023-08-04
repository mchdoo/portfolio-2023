/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        fore: "var(--fore)",
        back: "var(--back)",
        accent: {
          1: "#2d7296",
          2: "#dca632",
        },
      },
      fontFamily: {
        "migra-italic": ["Migra Italic", "serif"],
        migra: ["Migra", "serif"],
      },
      fontWeight: {
        DEFAULT: 400,
      },
    },
  },
  plugins: [],
};
