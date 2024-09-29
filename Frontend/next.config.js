/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  eslint: {
    ignoreDuringBuilds: true,
  },
  env: {
    API_BASE_URL: process.env.API_BASE_URL,
    APP_BASE_URL: process.env.APP_BASE_URL
  },
  output: 'export',
  images: {
    unoptimized: true //needed for using output: 'export'
  },
  //trailingSlash: true,
  //useFileSystemPublicRoutes: true,
}

module.exports = nextConfig
