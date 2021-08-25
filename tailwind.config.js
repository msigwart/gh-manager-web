module.exports = {
  purge: ['./pages/**/*.{js,ts,jsx,tsx}', './components/**/*.{js,ts,jsx,tsx}'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      minHeight: {
        'screen/2': '50vh',
        'screen/3': '33vh',
        'screen/4': '25vh',
      },
      boxShadow: {
        'radio': '0px 0px 0px 2px white inset'
      }
    },
  },
  variants: {
    extend: {
      backgroundColor: ['checked'],
      borderColor: ['checked'],
      boxShadow: ['checked']
    }
  },
  plugins: [
    require('@tailwindcss/aspect-ratio'),
  ],
}
