/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        backend: "#33907C",
        base1: "#242E33",
        base2: "#3B585D",
        base3: "#9C8E3B",
        base4: "#DD9F49",
        base5: "#E49445",
        fundo1: "#192232",
        fundo2: "#1F2937",
      },
    },
  },
  plugins: [],
};
