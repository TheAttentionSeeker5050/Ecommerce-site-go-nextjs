/** @type {import('next').NextConfig} */
require('dotenv').config();

const nextConfig = {
  reactStrictMode: true,
  
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
