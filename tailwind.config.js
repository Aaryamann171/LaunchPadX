/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
 
    // Or if using `src` directory:
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: (theme) => ({
        primary: "var(--primary)",
        accent: "var(--accent)",
        foreground: "var(--foreground)",
        foregroundAlt: "var(--foregroundAlt)",
        foregroundDark: "var(--foregroundDark)",
        foregroundDarker: "var(--foregroundDarker)",
        pastelPurple: "var(--pastelPurple)",
        pastelBlue: "var(--pastelBlue)",
        pastelGreen: "var(--pastelGreen)",
      }),
    },
  },
  plugins: [],
}

