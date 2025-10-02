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
        vibrate: {
          '0%, 100%': { transform: 'translateX(0px)' },
          '10%': { transform: 'translateX(-1px)' },
          '20%': { transform: 'translateX(1px)' },
          '30%': { transform: 'translateX(-1px)' },
          '40%': { transform: 'translateX(1px)' },
          '50%': { transform: 'translateX(-1px)' },
          '60%': { transform: 'translateX(1px)' },
          '70%': { transform: 'translateX(-1px)' },
          '80%': { transform: 'translateX(1px)' },
          '90%': { transform: 'translateX(-1px)' },
        },
        'flash-red': {
          '0%': { backgroundColor: 'rgba(239, 68, 68, 0)' },
          '50%': { backgroundColor: 'rgba(239, 68, 68, 0.3)' },
          '100%': { backgroundColor: 'rgba(239, 68, 68, 0)' },
        },
      },
      animation: {
        float: 'float 3s ease-in-out infinite',
        'pulse-light': 'pulse-light 1.5s ease-in-out infinite',
        'warning-bounce': 'warning-bounce 0.8s ease-in-out infinite',
        vibrate: 'vibrate 0.1s ease-in-out infinite',
        'flash-red': 'flash-red 0.1s ease-in-out',
      },
      boxShadow: {
        'green-glow': '0 0 20px rgba(34, 197, 94, 0.6)',
        'yellow-glow': '0 0 20px rgba(234, 179, 8, 0.6)',
        'orange-glow': '0 0 20px rgba(249, 115, 22, 0.6)',
        'red-glow': '0 0 20px rgba(239, 68, 68, 0.8)',
        'gray-glow': '0 0 20px rgba(107, 114, 128, 0.6)',
      },
    },
  },
  plugins: [],
}
