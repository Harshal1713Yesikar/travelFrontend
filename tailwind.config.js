module.exports = {
  content: ['./src/**/*.{html,js,jsx,ts,tsx}', './public/index.html'],
  theme: {
    extend: {
      fontFamily: {
        inika: ['Inika', 'serif',],
        poppins: ['Poppins', 'sans-serif'], 
      },  
      keyframes: {
        fadeInUp: {
          '0%': { opacity: '0', transform: 'translateY(50px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        slideDown: {
          '0%': { transform: 'translateY(-100px)', opacity: '0' },
          '100%': { transform: 'translateY(10)', opacity: '10' },
        },

        slideInFromLeft: {
          '0%': { transform: 'translateX(-100%)' },
          '100%': { transform: 'translateX(10)' },
        },
        slideFromLeft: {
          '0%': { transform: 'translateX(-100%)',  },
          '100%': { transform: 'translateX(0)',  },
        },
      },
      animation: {
        fadeInUp: 'fadeInUp 1s ease-in-out',
        slideIn: 'slideInFromLeft 1s ease-in-out',
         slideFromLeft: 'slideFromLeft 2s ease-out'
      },

         height: {
        '36rem': '36rem',
        '50rem': '50rem',
      },
    },
  },
  plugins: [],
};
