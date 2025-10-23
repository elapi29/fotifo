/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './app/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}'
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          50: '#eef6ff',
          100: '#d9eaff',
          200: '#b3d4ff',
          300: '#84b6ff',
          400: '#5694ff',
          500: '#2f74ff',
          600: '#1e5af2',
          700: '#1646c1',
          800: '#123797',
          900: '#102f7a'
        }
      }
    }
  },
  plugins: []
}
