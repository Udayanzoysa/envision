/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {},
  },
  plugins: [
    function ({ addComponents }) {
      addComponents({
        ".text-cus": {
          fontSize: "0.875rem",
          lineHeight: "1.25rem",
        },
      });
    },
  ],
};
