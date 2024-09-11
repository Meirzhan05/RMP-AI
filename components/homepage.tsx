"use client"
import { MessageCircle, Star, Lightbulb, Clock } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@clerk/nextjs';
export default function HomePage() {
    const router = useRouter();
    const { isSignedIn } = useAuth();

    const handleGetStarted = async () => {
      if (isSignedIn) {
        router.push('/dashboard')
      } else {
        router.push('/sign-up')
      }
    }
    return (
        <div className="min-h-screen bg-gradient-to-br from-purple-900 via-indigo-800 to-blue-900 text-white">
        <main className="container mx-auto px-6 py-12">
          <div className="flex flex-col items-center text-center mb-16">
            <h1 className="text-5xl md:text-6xl font-bold mb-6 leading-tight">
              Rate Smarter,<br />Learn Better
            </h1>
            <p className="text-xl md:text-2xl mb-8 max-w-2xl">
              Get instant insights about professors and courses using our AI-powered platform.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
                <button 
                    className="bg-purple-600 hover:bg-purple-700 text-white font-bold py-3 px-8 rounded-full transition duration-300 transform hover:scale-105 cursor-pointer"
                onClick={handleGetStarted}
                >
                    Get Started
                </button>


                <button className="bg-transparent hover:bg-purple-800 text-white font-bold py-3 px-8 border border-white rounded-full transition duration-300 transform hover:scale-105 cursor-pointer">
                Learn More
              </button>
            </div>
          </div>
  
          <div className="mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">Why Choose Us?</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {[
                { icon: <MessageCircle className="w-12 h-12" />, title: "Comprehensive Ratings", description: "Access reviews for thousands of professors" },
                { icon: <Star className="w-12 h-12" />, title: "Personalized Recommendations", description: "Get tailored course suggestions" },
                { icon: <Lightbulb className="w-12 h-12" />, title: "In-depth Insights", description: "Learn about teaching styles and expectations" },
                { icon: <Clock className="w-12 h-12" />, title: "24/7 Availability", description: "Get answers to your queries anytime" },
              ].map((feature, index) => (
                <div key={index} className="bg-white bg-opacity-10 backdrop-blur-md rounded-xl p-6 transform transition duration-500 hover:scale-105">
                  <div className="text-purple-400 mb-4">{feature.icon}</div>
                  <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                  <p className="text-gray-300">{feature.description}</p>
                </div>
              ))}
            </div>
          </div>
        </main>
      </div>
    )
}