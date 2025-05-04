/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [{
                protocol: 'https',
                hostname: 'i.pinimg.com',
            },
            {
                protocol: 'https',
                hostname: 'flowbite.s3.amazonaws.com',
            },
            {
                protocol: 'https',
                hostname: '*.pinimg.com',
            },
        ],
    },
};

export default nextConfig;