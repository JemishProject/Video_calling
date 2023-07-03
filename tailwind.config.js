const withMT = require("@material-tailwind/react/utils/withMT");
module.exports = withMT({
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        'blue': '#5469D4',
        'white': '#FFFFFF',
        'green': '#69DD84',
        'customPurple': '#7367f0',
      }
    }    
  },
  plugins: [],
});
