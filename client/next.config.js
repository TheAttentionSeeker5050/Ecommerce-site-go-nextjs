/** @type {import('next').NextConfig} */
require('dotenv').config();

const nextConfig = {
  reactStrictMode: true,
  env: {
    API_URL:'http://127.0.0.1:8001',
    API_USER_SUBDIR:'user',
  },
  
};

module.exports = nextConfig;
