/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-8px)' },
        },
        'pulse-light': {
          '0%, 100%': { 
            opacity: '1',
            transform: 'scale(1)'
          },
          '50%': { 
            opacity: '0.8',
            transform: 'scale(1.02)'
          },
        },
        'warning-bounce': {
          '0%, 100%': { 
            transform: 'translateY(0px) scale(1)',
            boxShadow: '0 0 0 0 rgba(245, 158, 11, 0.7)'
          },
          '25%': { 
            transform: 'translateY(-4px) scale(1.05)',
            boxShadow: '0 0 0 8px rgba(245, 158, 11, 0.3)'
          },
          '50%': { 
            transform: 'translateY(-8px) scale(1.1)',
            boxShadow: '0 0 0 16px rgba(245, 158, 11, 0.1)'
          },
          '75%': { 
            transform: 'translateY(-4px) scale(1.05)',
            boxShadow: '0 0 0 8px rgba(245, 158, 11, 0.3)'
          },
        },
        explosion: {
          '0%': { 
            transform: 'scale(1) rotate(0deg)',
            boxShadow: '0 0 0 0 rgba(239, 68, 68, 0.7)',
            filter: 'brightness(1)'
          },
          '10%': { 
            transform: 'scale(1.1) rotate(3deg)',
            boxShadow: '0 0 0 5px rgba(239, 68, 68, 0.7)',
            filter: 'brightness(1.2)'
          },
          '20%': { 
            transform: 'scale(1.2) rotate(-3deg)',
            boxShadow: '0 0 0 10px rgba(239, 68, 68, 0.5)',
            filter: 'brightness(1.4)'
          },
          '30%': { 
            transform: 'scale(1.1) rotate(3deg)',
            boxShadow: '0 0 0 15px rgba(239, 68, 68, 0.3)',
            filter: 'brightness(1.2)'
          },
          '40%': { 
            transform: 'scale(1.2) rotate(-3deg)',
            boxShadow: '0 0 0 20px rgba(239, 68, 68, 0.1)',
            filter: 'brightness(1.4)'
          },
          '50%': { 
            transform: 'scale(1.1) rotate(3deg)',
            boxShadow: '0 0 0 25px rgba(239, 68, 68, 0)',
            filter: 'brightness(1.2)'
          },
          '60%': { 
            transform: 'scale(1.2) rotate(-3deg)',
            boxShadow: '0 0 0 20px rgba(239, 68, 68, 0.1)',
            filter: 'brightness(1.4)'
          },
          '70%': { 
            transform: 'scale(1.1) rotate(3deg)',
            boxShadow: '0 0 0 15px rgba(239, 68, 68, 0.3)',
            filter: 'brightness(1.2)'
          },
          '80%': { 
            transform: 'scale(1.2) rotate(-3deg)',
            boxShadow: '0 0 0 10px rgba(239, 68, 68, 0.5)',
            filter: 'brightness(1.4)'
          },
          '90%': { 
            transform: 'scale(1.1) rotate(3deg)',
            boxShadow: '0 0 0 5px rgba(239, 68, 68, 0.7)',
            filter: 'brightness(1.2)'
          },
          '100%': { 
            transform: 'scale(1) rotate(0deg)',
            boxShadow: '0 0 0 0 rgba(239, 68, 68, 0.7)',
            filter: 'brightness(1)'
          },
        },
      },
      animation: {
        float: 'float 3s ease-in-out infinite',
        'pulse-light': 'pulse-light 1.5s ease-in-out infinite',
        'warning-bounce': 'warning-bounce 0.8s ease-in-out infinite',
        explosion: 'explosion 1s ease-in-out infinite',
      },
    },
  },
  plugins: [],
}
