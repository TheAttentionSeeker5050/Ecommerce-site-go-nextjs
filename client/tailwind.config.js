/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    // extend: {
    //   backgroundImage: {
    //     'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
    //     'gradient-conic':
    //       'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
    //   },
    // },
    colors: {
      // extend: {
        primary: {
          light: '#3a86ff',
          DEFAULT: '#3a86ff',
          dark: '#415a77',

        },
        secondary: {
          light: '#8338ec',
          DEFAULT: '#8338ec',
          dark: '#1d3557',
        },
        neutral: {
          light: '#6c757d',
          DEFAULT: '#6c757d',
          dark: '#e9ecef',
        },
        black: '#000000',
        white: '#ffffff',
        danger: '#ff0000',
        success: '#00ff00',
        warning: '#ffff00',
        info: '#00ffff',
        gray: {
          light: '#f5f5f5',
          DEFAULT: '#d3d3d3',
          dark: '#a9a9a9',
        },
      },
    },
    fontFamily: {
      sans: ['Roboto', 'sans-serif'],
      serif: ['Roboto Slab', 'serif'],
      mono: ['Roboto Mono', 'monospace'],

    },
  // },
  plugins: [],
}
