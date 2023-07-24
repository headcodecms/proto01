/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    serverActions: true,
  },
  images: {
    domains: ['tecuejaemlzqidrpztjh.supabase.co'],
  },
}

module.exports = nextConfig
