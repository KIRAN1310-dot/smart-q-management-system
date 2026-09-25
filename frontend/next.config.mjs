/** @type {import('next').NextConfig} */
const nextConfig = {
  async redirects() {
    return [
      {
        source: "/admin-dashboard",
        destination: "/admin",
        permanent: true
      }
    ];
  }
};

export default nextConfig;
