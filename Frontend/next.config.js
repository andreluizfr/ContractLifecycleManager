/** @type {import('next').NextConfig} */
const nextConfig = {
  trailingSlash: true,
  reactStrictMode: true,
  useFileSystemPublicRoutes: true,
  eslint: {
    ignoreDuringBuilds: true,
  },
  env: {
    API_BASE_URL: process.env.API_BASE_URL,
    APP_BASE_URL: process.env.APP_BASE_URL
  }
}

module.exports = nextConfig
