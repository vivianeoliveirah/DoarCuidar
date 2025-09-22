/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        brand: {
          50:"#eef6ff",100:"#d9ebff",200:"#b9d9ff",300:"#8cc0ff",
          400:"#5ea6ff",500:"#358dff",600:"#1f73e8",700:"#155ec2",
          800:"#114c9b",900:"#0e3f80",
        },
      },
      boxShadow: { card: "0 2px 8px rgba(0,0,0,.06)" },
      borderRadius: { xl: "1rem", "2xl": "1.25rem" },
    },
  },
  plugins: [],
};
