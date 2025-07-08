/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: [
      "cdn-icons-png.flaticon.com", // Para el avatar del AI Coach
      "www.gravatar.com", // Para el avatar del usuario
    ],
  },
};

module.exports = nextConfig;
