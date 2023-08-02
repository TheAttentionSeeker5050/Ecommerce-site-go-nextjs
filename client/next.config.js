/** @type {import('next').NextConfig} */
require('dotenv').config();

const nextConfig = {
  reactStrictMode: true,
  env: {
    API_URL:'http://127.0.0.1:8081/v1',
    API_URL_REMOTE:'https://ecommerce-x.alligatorcode.pro/api/v1',
    CLIENT_URL:'http://127.0.0.1:3001',
    CLIENT_URL_REMOTE:'https://ecommerce-x.alligatorcode.pro',
    API_USER_SUBDIR:'user',
    MAINTENANCE_MODE: 'false',
    GITHUB_OAUTH_REDIRECT_URL: '/sessions/oauth/github',
    GOOGLE_OAUTH_REDIRECT_URL: '/sessions/oauth/google',
    GITHUB_CLIENT_ID_DEV: '31ca4b2ec044339b9570',
    GITHUB_CLIENT_ID_PROD: '05e0f5394297b8e961ae',
    GOOGLE_CLIENT_ID_DEV: '31ca4b2ec044339b9570',
    GOOGLE_CLIENT_ID_PROD: 'not-yet-implemented',
    // MAINTENANCE_MODE: 'true',
  },
  images: {
    domains: ['localhost', 'currentdevelopment.local', 'ecommerce-x.alligatorcode.pro', "cdn.pixabay.com", "imagedelivery.net"],
  },
  experimental: {
    serverActions: true,
  },
};

module.exports = nextConfig;
