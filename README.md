# Smart Rate 🎓

Smart Rate is an innovative AI-powered platform designed to help Stetson University students find the best professors for their academic needs. Leveraging advanced technologies like Retrieval-Augmented Generation (RAG) and natural language processing, Smart Rate provides personalized professor recommendations based on student queries.

## 🌐 Live Demo

Experience Smart Rate in action: [https://rmp-ai.vercel.app/](https://rmp-ai.vercel.app/)

## 🌟 Features

- **AI-Powered Recommendations**: Get tailored professor suggestions using state-of-the-art language models.
- **Comprehensive Database**: Access a vast repository of professor information, including teaching styles, course ratings, and student feedback.
- **User-Friendly Chat Interface**: Interact with our AI assistant through a sleek, responsive chat interface.
- **Real-Time Updates**: Receive instant, stream-based responses for a smooth user experience.
- **Secure Authentication**: Powered by Clerk for safe and easy user management.

## 🚀 Getting Started

### Prerequisites

- Node.js (v14 or later)
- PostgreSQL
- Pinecone account
- OpenAI API key
- Groq API key
- Clerk account

### Installation

1. Clone the repository:
   ```
   git clone https://github.com/your-username/smart-rate.git
   cd smart-rate
   ```

2. Install dependencies:
   ```
   npm install
   ```

3. Set up environment variables:
   Create a `.env` file in the root directory and add the following:
   ```
   POSTGRES_URL=your_postgres_connection_string
   CLERK_PUBLISHABLE_KEY=your_clerk_publishable_key
   CLERK_SECRET_KEY=your_clerk_secret_key
   PINECONE_API_KEY=your_pinecone_api_key
   OPENAI_API_KEY=your_openai_api_key
   GROQ_API_KEY=your_groq_api_key
   ```

4. Set up the database:
   ```
   npx prisma generate
   npx prisma db push
   ```

5. Seed the database:
   ```
   npm run seed
   ```

6. Start the development server:
   ```
   npm run dev
   ```

Visit `http://localhost:3000` to see the application in action!

## 🛠️ Technologies Used

- Next.js
- React
- TypeScript
- Prisma
- PostgreSQL
- Pinecone
- OpenAI
- Groq
- Clerk
- Framer Motion

## 📚 Project Structure

- `/app`: Next.js app router and API routes
- `/components`: Reusable React components
- `/lib`: Utility functions and shared logic
- `/prisma`: Database schema and migrations
- `/scripts`: Database seeding and other scripts
- `/public`: Static assets

## 🤝 Contributing

We welcome contributions! Please see our [Contributing Guide](CONTRIBUTING.md) for more details.

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgements

- Stetson University for providing the initial dataset
- The open-source community for the amazing tools and libraries used in this project

---

Built with ❤️ by [Meirzhan]
