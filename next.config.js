/** @type {import('next').NextConfig} */
const nextConfig = {
  i18n: {
    locales: ["en"],
    defaultLocale: "en",
  },
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: [
      "i.scdn.co",
      "cdn.discordapp.com",
      "res.cloudinary.com",
      "images.unsplash.com",
      "google.com",
      "ditty.ir",
    ],
  },
};

module.exports = nextConfig;
