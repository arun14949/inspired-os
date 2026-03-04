/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./components/**/*.{js,vue,ts}",
    "./layouts/**/*.vue",
    "./pages/**/*.vue",
    "./plugins/**/*.{js,ts}",
    "./app.vue",
    "./error.vue",
    "./templates/**/*.vue",
    "./views/**/*.vue",
  ],
  theme: {
    extend: {
      colors: {
        'win-gray': '#c0c0c0',
        'win-dark-gray': '#808080',
        'win-light-gray': '#dfdfdf',
        'win-bg': '#018281',
        'win-title-active': '#00007c',
        'win-title-inactive': '#808080',
        'win-highlight': '#00007c',
        'win-highlight-text': '#ffffff',
        'win-border-light': '#fafafa',
        'win-border-dark': '#5a5a5a',
      },
      fontFamily: {
        'ms-sans': ['"MS Sans Serif"', 'Tahoma', 'Geneva', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
