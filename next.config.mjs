/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "standalone",
  images: {
    domains: ["techpoisk.com", "cdn.admitad-connect.com"],
  },
};

export default nextConfig;
