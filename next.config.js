/** @type {import('next').NextConfig} */
const nextConfig = {
  async rewrites() {
    return [
      {
        source: "/templates/linkedin-rebuild",
        destination: "/templates/linkedin-rebuild/index.html",
      },
    ];
  },
};

module.exports = nextConfig;
