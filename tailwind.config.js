/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        background: '#11161C',
        border: 'rgba(255,255,255,0.06)',
        textPrimary: '#F5F7FA',
        textMuted: '#8B949E',
        accent: '#4F8CFF',
      }
    },
  },
  plugins: [],
}
