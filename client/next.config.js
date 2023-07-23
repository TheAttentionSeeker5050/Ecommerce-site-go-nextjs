/** @type {import('next').NextConfig} */
require('dotenv').config();

const nextConfig = {
  // webpackDevMiddleware: config => {
  //   config.watchOptions = {
  //     poll: 1000,
  //     aggregateTimeout: 300,
  //   }
  //   return config
  // },
  reactStrictMode: true,
  env: {
    API_URL:'http://currentdevelopment.local:8081/api',
    API_URL_REMOTE:'https://ecommerce-x.alligatorcode.pro/api/v1',
    API_USER_SUBDIR:'user',
    MAINTENANCE_MODE: 'false',
    REACT_APP_GITHUB_CLIENT_ID_DEV: '31ca4b2ec044339b9570',
    GITHUB_OAUTH_REDIRECT_URL: '/sessions/oauth/github',
    REACT_APP_GITHUB_CLIENT_ID_PROD: '05e0f5394297b8e961ae',
    // MAINTENANCE_MODE: 'true',
  },
  images: {
    domains: ['localhost', 'currentdevelopment.local', 'ecommerce-x.alligatorcode.pro', "cdn.pixabay.com", "https://imagedelivery.net"],
  },
};

module.exports = nextConfig;
