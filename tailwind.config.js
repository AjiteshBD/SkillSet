module.exports = {
   purge:['./pages/**/*.{js,ts,jsx,tsx}', './components/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'class', // or 'media' or 'class'
  theme: {
    extend: {
      backgroundImage:{
        'hero-pattern': "url('/images/cover.gif')",
      },
      backgroundColor: theme => ({
        ...theme('colors'),
        'primary': '#3490dc',
        'secondary': '#ffed4a',
        'danger': '#e3342f',
       })
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
