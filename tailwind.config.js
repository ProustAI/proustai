/** @type {import('tailwindcss').Config} */
export default {
  content: ['./inertia/**/*.edge', './inertia/**/*.{js,ts,jsx,tsx,vue}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        serif: ['Lora', 'serif'],
      },
      gridTemplateColumns: {
        'auto-fill-64': 'repeat(auto-fill, minmax(16rem, 1fr))',
      },
    },
  },
  plugins: [
    require('tailwindcss-animate'),
    require('@tailwindcss/forms'),
    require('@tailwindcss/typography'),
  ],
}
