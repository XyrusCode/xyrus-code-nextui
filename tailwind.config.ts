// tailwind.config.js
const { nextui } = require('@nextui-org/react');

import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './node_modules/pliny/**/*.js',
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}',
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        primary: {
          '50': '#74dbef',
          '100': '#ffffff',
          '200': '#46cfea',
        },
        secondary: {
          '50': '#111111',
          '100': '#a2e7f4',
          '200': '#2a2a2a',
        },
      },
      textColor: {
        primary: {
          light: 'secondary-50', // Use light mode color
          dark: 'primary-50', // Use dark mode color
        },
      },
    },
  },
  plugins: [nextui()],
};
export default config;
