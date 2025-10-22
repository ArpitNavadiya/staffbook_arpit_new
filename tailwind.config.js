module.exports = {
  theme: {
    extend: {
      animation: {
        'infinite-scroll': 'scroll 25s linear infinite',
        'infinite-scroll-reverse': 'scroll-reverse 25s linear infinite',
      },
      keyframes: {
        scroll: {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(calc(-100% - 1rem))' },
        },
        'scroll-reverse': {
          '0%': { transform: 'translateX(calc(-100% - 1rem))' },
          '100%': { transform: 'translateX(0)' },
        },
      },
    },
  },
}