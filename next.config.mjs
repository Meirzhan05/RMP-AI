/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        domains: ['img.clerk.com', 'localhost:300'],
    },
    env: {
        DB_USER: process.env.DB_USER,
        DB_PASSWORD: process.env.DB_PASSWORD,
        DB_NAME: process.env.DB_NAME,
        CLERK_SECRET_KEY: process.env.CLERK_SECRET_KEY,
        PINECONE_API_KEY: process.env.PINECONE_API_KEY,
        OPENAI_API_KEY: process.env.OPENAI_API_KEY,
        GROQ_API_KEY: process.env.GROQ_API_KEY,
    },
    output: "standalone",
};

export default nextConfig;