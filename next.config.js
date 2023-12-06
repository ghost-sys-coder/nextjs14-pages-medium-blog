/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ["lh3.googleusercontent.com", "firebasestorage.googleapis.com", "avatars.githubusercontent.com"]
  },
  async headers() {
    return [
      {
        source: '/api/posts',
        headers: [
          {
            key: 'posts',
            value: 'x-posts'
          }
        ]
      }
    ]
  }
}

module.exports = nextConfig
