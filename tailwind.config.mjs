/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  theme: {
    extend: {
      colors: {
        'lime': {
          DEFAULT: '#1DFF0A',
          '50': '#F2FFF0',
          '100': '#E5FFE0',
          '200': '#CBFFC0',
          '300': '#B0FFA0',
          '400': '#96FF80',
          '500': '#7CFF60',
          '600': '#62FF40',
          '700': '#48FF20',
          '800': '#2EFF00',
          '900': '#24CB00'
        },
        'blue': {
          DEFAULT: '#05C3FF',
          '50': '#F0FBFF',
          '100': '#E1F7FF',
          '200': '#C3EEFF',
          '300': '#A5E5FF',
          '400': '#87DCFF',
          '500': '#69D3FF',
          '600': '#4BCAFF',
          '700': '#2DC1FF',
          '800': '#0FB8FF',
          '900': '#05C3FF'
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
      },
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
  ],
}
