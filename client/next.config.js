/** @type {import('next').NextConfig} */
require('dotenv').config();

const nextConfig = {
  reactStrictMode: true,
  env: {
    API_URL:'http://127.0.0.1:8081',
    API_URL_REMOTE:'http://159.65.225.127:8081',
    API_USER_SUBDIR:'user',
    MAINTENANCE_MODE: 'false',
    // MAINTENANCE_MODE: 'true',
    // NODE_ENV: 'development',
    // NODE_ENV: 'production',
  },
  
};

module.exports = nextConfig;
