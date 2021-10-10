module.exports = {
  mode: "jit",
  purge: ["./src/**/*.tsx", "./src/**/*.ts"],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        main: {
          DEFAULT: '#1B1E21',
          dark: '#161A1D',
          black: '#0E1515',
        },
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
          highlight: '#45474a',
        },
        userinfo: {
          DEFAULT: '#383a3d',
        },
        userlist: {
          DEFAULT: '#3f4245',
          highlight: '#484b4f',
        },
        textbox: {
          DEFAULT: '#54575c',
        }
      }
    }
  },
  variants: {
    extend: {},
  },
  plugins: [
    require('@tailwindcss/forms'),
  ],
};
