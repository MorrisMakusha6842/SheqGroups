const { transform } = require('typescript')

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,ts}",
  ],
  theme: {
    screens: {
      sm: '340px',
      md: '768px',
      lg: '976px',
      lg: '1024px',
      
     
    },
    extend: {
      backgroundImage: {
        'desktop': "url('assets/images/bg-header-desktop.png')",
        'mobile': "url('assets/images/bg-header-mobile.png')"
      },
      animation: {
        'spin-slow': 'spin 3s linear infinite',
      },
    },
  },
  plugins: [
    require('daisyui'),
  ],

}

