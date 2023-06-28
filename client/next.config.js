/** @type {import('next').NextConfig} */
require('dotenv').config();

const nextConfig = {
  reactStrictMode: true,
  env: {
    API_URL:'http://127.0.0.1:8000',
    API_USER_SUBDIR:'user',
  },
  
};
  
module.exports = nextConfig;

// const withPlugins = require('next-compose-plugins');
// const withTM = require('next-transpile-modules')(['@tailwindcss/typography']);

// module.exports = withPlugins([withTM], {
//   reactStrictMode: true,
//   future: {
//     webpack5: true,
//   },
//   webpack: (config, { isServer }) => {
//     if (isServer) {
//       require('./scripts/generate-sitemap');
//     }

//     return config;
//   },
// });
