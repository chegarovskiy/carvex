/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        roboto: ['var(--font-roboto)'],
        montserrat: ['var(--font-montcerrat)'],
        // roboto_regular: ['roboto-regular'],
        // montserat_medium: ['montserat-medium'],
      },
      typography: {
        quoteless: {
          css: {
            'blockquote p:first-of-type::before': { content: 'none' },
            'blockquote p:first-of-type::after': { content: 'none' },
          },
        },
      },
      minWidth: {
        'w-min-300px': '300px',
      },
      maxWidth: {
        'layout-1600': '1600px',
        'layout-1180': '1180px',
      },
      padding: {
        'content-32': '32px'
      },
       colors: {
      'gray1': '#4B4B4B',
      'red1': '#FB5326',
      'green1': '#3EC927',
    },
    },
   
  },
  future: {
    hoverOnlyWhenSupported: true,
  },
  plugins: [require('@tailwindcss/typography')],
};
