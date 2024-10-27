/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "standalone",
  images: {
    domains: ["techpoisk.com", "cdn.admitad-connect.com"],
  },
  // experimental: {
  //   missingSuspenseWithCSRBailout: false,
  // },
};

export default nextConfig;
