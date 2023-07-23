/** @type {import('tailwindcss').Config} */

module.exports = {
  mode: "jit",
  darkMode: 'class',
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          light: '#3a86ff',
          DEFAULT: '#3a86ff',
          dark: '#ced4da',
          hover: '#5d92e7',
        },
        brand: {
          DEFAULT: '#34D399',
          dark: '#699669',
          lighter: '#6EE7B7',
          electric: '#6EE7B7',
          vivid: '#16A34A',
          light: '#4ADE80',
        },
        secondary: {
          light: '#8338ec',
          DEFAULT: '#8338ec',
          dark: '#1d3557',
          hover: '#9b60ed',
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
          light: '#ced4da',
          DEFAULT: '#d3d3d3',
          dark: '#343a40',
        },
        orange: {
          light: '#ff8c00',
          DEFAULT: '#ff8c00',
          dark: '#ff4500',
        },
        background: {
          light: '#f8f9fa',
          DEFAULT: '#f8f9fa',
          dark: '#415a77',
        },
        pagetitle: {
          light: '#3a86ff',
          DEFAULT: '#343a40',
          dark: '#ff4500',
        },
        
      },
      screens: {
        "phone": "480px",
        "tablet": "640px",
        "laptop": "1024px",
        "desktop": "1280px",
      },
      fontFamily: {
        sans: ['Roboto', 'sans-serif'],
        serif: ['Roboto Slab', 'serif'],
        mono: ['Roboto Mono', 'monospace'],
      },
    },
  },
  plugins: [],
}
