import type { Config } from 'tailwindcss'

export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        space: '#010218',
        orange: '#FF6F3F',
        cream: '#FFF7EB',
        teal: '#1A2E33',
        white: '#FFFFFF',
        star: '#FFD580',
        muted: '#A7A7A7',
      },
      fontFamily: {
        display: ['Aleo', 'serif'],
        body: ['Avenir', 'Inter', 'sans-serif'],
        accent: ['Caveat', 'cursive'],
      },
      borderRadius: {
        card: '12px',
        pill: '9999px',
      },
    },
  },
} satisfies Config
