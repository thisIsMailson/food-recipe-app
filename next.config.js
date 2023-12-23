/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'spoonacular.com',
        port: '',
      },
      {
        protocol: 'https',
        hostname: 'edamam-product-images.s3.amazonaws.com',
        port: '',
      },
    ],
  },
};

module.exports = nextConfig;
