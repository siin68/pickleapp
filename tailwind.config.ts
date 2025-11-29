import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#fff1f3',
          100: '#ffe4e9',
          200: '#ffcdd7',
          300: '#ffa3b5',
          400: '#ff6b8e',
          500: '#ff3d71',
          600: '#fe1659',
          700: '#d6004a',
          800: '#b10042',
          900: '#93003d',
        },
        accent: {
          50: '#fff7ed',
          100: '#ffedd5',
          200: '#fed7aa',
          300: '#fdba74',
          400: '#fb923c',
          500: '#f97316',
          600: '#ea580c',
          700: '#c2410c',
          800: '#9a3412',
          900: '#7c2d12',
        },
      },
      backgroundImage: {
        'gradient-tinder': 'linear-gradient(135deg, #fe1659 0%, #ff6b8e 100%)',
        'gradient-soft': 'linear-gradient(135deg, #fff1f3 0%, #ffe4e9 100%)',
      },
      boxShadow: {
        'tinder': '0 10px 40px -10px rgba(254, 22, 89, 0.3)',
        'card': '0 4px 20px rgba(0, 0, 0, 0.08)',
      },
    },
  },
  plugins: [],
};
export default config;
