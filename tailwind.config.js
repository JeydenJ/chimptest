module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}", 
  ],
  theme: {
    extend: {
      colors: {
        'dark-blue': '#212b42', 
        'main-text': '#91b4d5',
        'button-color':'#5c7da5',
      },
      fontFamily:{
        'roboto-mono': ['"Roboto Mono"', 'monospace'],
      }
    },
  },
  plugins: [],
};