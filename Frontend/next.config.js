/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  env: {
    API_BASE_URL: process.env.API_BASE_URL,
    APP_BASE_URL: process.env.APP_BASE_URL
  },
  useFileSystemPublicRoutes: false,
  swcMinify: false
}

module.exports = nextConfig
