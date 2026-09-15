/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        paper: '#faf3e8',
        card: '#f0e4d3',
        line: '#ddc9ae',
        ink: '#3a2a1e',
        muted: '#8a7561',
        accent: {
          DEFAULT: '#c1622f',
          dark: '#a3501f',
        },
      },
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
  ],
}
