"use client"

import { MessageCircle, Star, Lightbulb, Clock } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { useAuth } from '@clerk/nextjs'
import { motion } from 'framer-motion'

export default function HomePage() {
  const router = useRouter()
  const { isSignedIn } = useAuth()

  const handleGetStarted = async () => {
    if (isSignedIn) {
      router.push('/dashboard')
    } else {
      router.push('/sign-up')
    }
  }

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  }

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100
      }
    }
  }

  return (
    <div className="w-full text-white">
      <motion.main 
        className="container mx-auto px-4 py-16 flex flex-col items-center"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.h1 
          className="text-6xl md:text-7xl font-bold mb-8 text-center leading-tight"
          variants={itemVariants}
        >
          Rate Smarter,
          <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-400 to-blue-500">
            Learn Better
          </span>
        </motion.h1>
        <motion.p 
          className="text-xl md:text-2xl mb-12 max-w-2xl text-center text-gray-300"
          variants={itemVariants}
        >
          Get instant insights about professors at Stetson University using our AI-powered platform.
        </motion.p>
        <motion.div 
          className="flex gap-6 mb-24"
          variants={itemVariants}
        >
          <motion.button
            onClick={handleGetStarted}
            className="bg-teal-500 text-white font-bold py-3 px-8 rounded-full transition-all hover:bg-teal-600"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Get Started
          </motion.button>
          {/* <motion.button 
            className="border border-gray-400 text-gray-300 font-bold py-3 px-8 rounded-full transition-all hover:bg-gray-700"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Learn More
          </motion.button> */}
        </motion.div>

        <motion.h2 
          className="text-3xl md:text-4xl font-bold text-center mb-12"
          variants={itemVariants}
        >
          Why Choose Us?
        </motion.h2>
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 w-full max-w-5xl"
          variants={containerVariants}
        >
          {[
            { icon: MessageCircle, title: "Comprehensive Ratings", description: "Access reviews for thousands of professors" },
            { icon: Star, title: "Personalized Recommendations", description: "Get tailored course suggestions" },
            { icon: Lightbulb, title: "In-depth Insights", description: "Learn about teaching styles and expectations" },
            { icon: Clock, title: "24/7 Availability", description: "Get answers to your queries anytime" },
          ].map((feature, index) => (
            <motion.div 
              key={index} 
              className="bg-gray-800 bg-opacity-50 backdrop-blur-sm rounded-2xl p-6 transition-all hover:bg-opacity-70"
              variants={itemVariants}
              whileHover={{ scale: 1.05 }}
            >
              <feature.icon className="w-10 h-10 text-teal-400 mb-4" />
              <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
              <p className="text-gray-400">{feature.description}</p>
            </motion.div>
          ))}
        </motion.div>
      </motion.main>
    </div>
  )
}