export default {
  plugins: {
    autoprefixer: {},
    // PurgeCSS for production builds
    ...(process.env.NODE_ENV === 'production'
      ? {
          '@fullhuman/postcss-purgecss': {
            content: [
              './client/index.html',
              './client/src/**/*.{js,jsx,ts,tsx}',
            ],
            defaultExtractor: (content) => content.match(/[\w-/:]+(?<!:)/g) || [],
            safelist: {
              standard: ['html', 'body'],
              deep: [/^motion-/, /^framer-/],
              greedy: [/^lucide-/],
            },
          },
        }
      : {}),
  },
};
