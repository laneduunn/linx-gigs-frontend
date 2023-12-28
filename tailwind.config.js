/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      screens: {
        xxxxs: "250px",
        xxxs: "320px",
        xxs: "420px",
        xs: "500px",
        sm: "640px",
        md: "768px",
        lg: "1024px",
      },
      fontFamily: {
        main: ["Poppins", "sans-serif"],
      },
      textColor: {
        primary: "#35C8FF",
        secondary: "#0F0F0F",
      },
      backgroundColor: {
        primary: "#35C8FF",
        secondary: "#0F0F0F",
      },
      borderColor: {
        primary: "#35C8FF",
        secondary: "#0F0F0F",
      },
    },
  },
  plugins: [],
};
