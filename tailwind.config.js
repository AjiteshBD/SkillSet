module.exports = {
   purge: {
    content: ["./src/pages/**/*.{js,jsx,ts,tsx}", "./src/components/**/*.{js,jsx,ts,tsx}"]
    // These options are passed through directly to PurgeCSS
  },
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
