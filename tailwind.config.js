module.exports = {
  mode: 'jit',
  purge: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        servers: {
          DEFAULT: '#2c2e30',
        },
        channels: {
          DEFAULT: '#3f4245',
          highlight: '#484b4f',
          selected: '#474b4f',
          text: '#8f969c',
        },
        messages: {
          DEFAULT: '#4b4e52',
          highlight: '',
        },
        userinfo: {
          DEFAULT: '#383a3d',
        },
        userlist: {
          DEFAULT: '#3f4245',
          highlight: '#484b4f',
        },
        textbox: {
          DEFAULT: '#54575c'
        }
      }
    }
  },
  variants: {},
  plugins: [
    require('@tailwindcss/forms'),
  ],
}
