/** @type {import('next').NextConfig} */
require('dotenv').config();

const nextConfig = {
  webpackDevMiddleware: config => {
    config.watchOptions = {
      poll: 1000,
      aggregateTimeout: 300,
    }
    return config
  },
  reactStrictMode: true,
  env: {
    API_URL:'http://127.0.0.1:8081',
    API_URL_REMOTE:'https://ecommerce-x.alligatorcode.pro/api/v1',
    API_USER_SUBDIR:'user',
    MAINTENANCE_MODE: 'false',
    REACT_APP_GITHUB_CLIENT_ID_DEV: '31ca4b2ec044339b9570',
    GITHUB_OAUTH_REDIRECT_URL: '/user/auth/callback',
    REACT_APP_GITHUB_CLIENT_ID: '05e0f5394297b8e961ae',
    // MAINTENANCE_MODE: 'true',
  },
};

module.exports = nextConfig;
