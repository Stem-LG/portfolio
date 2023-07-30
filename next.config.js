/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    swcMinify: true,
    images: {
        domains: ["lh3.googleusercontent.com", "www.louay.tn", "i.ibb.co"],
    },
};

module.exports = nextConfig;
