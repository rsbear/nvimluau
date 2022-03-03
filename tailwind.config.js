const colors = require('tailwindcss/colors')

module.exports = {
  content: ['./src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      typography: ({ theme }) => ({
        DEFAULT: {
          css: {
            color: colors.neutral[300],
            p: { color: colors.neutral[400] },
            a: { color: colors.blue[400] },
            code: {
              color: colors.neutral[400],
              background: colors.neutral['800'],
              padding: '4px',
            },
            h1: { color: colors.neutral[200] },
            h2: { color: colors.neutral[200] },
            h3: { color: colors.neutral[200] },
            h4: { color: colors.neutral[200] },
            strong: { color: colors.purple[200] },
            li: { 'margin-top': '0.25em', 'margin-bottom': '0.25em' },
            pre: { 'background-color': colors.neutral['800'] },
          },
        },
      }),
    },
  },
  plugins: [require('@tailwindcss/typography')],
}
