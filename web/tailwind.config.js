/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      textStrokeWidth: {
        '1': '1px',
        '2': '2px',
        '4': '4px',
      },
      textStrokeColor: {
        white: '#ffffff',
        black: '#000000',
      },
    },
  },
  plugins: [],
}

