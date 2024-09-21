"use client"

import React, { useState, useRef, useEffect } from 'react';
import { Send, User, Bot } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useUser } from '@clerk/nextjs';
import { useRouter } from 'next/navigation';
import LoadingSpinner from '@/components/loadingSpinner';

interface Message {
  role: 'user' | 'assistant';
  content: string;
}

function useAuthCheck() {
  const { user, isLoaded } = useUser();
  const router = useRouter();

  useEffect(() => {
    if (isLoaded && !user) {
      router.push('/sign-in');
    }
  }, [isLoaded, user, router]);

  return { isLoaded, user };
}

function ChatContent() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(scrollToBottom, [messages]);

  const handleSend = async () => {
    if (input.trim()) {
      setMessages((prevMessages) => [
        ...prevMessages,
        { role: 'user', content: input },
      ]);
      setInput('');
      setIsTyping(true);

      try {
        const response = await fetch('/api/chat', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify([...messages, { role: 'user', content: input }]),
        });

        if (!response.ok) {
          throw new Error('Network response was not ok');
        }

        const reader = response.body?.getReader();
        const decoder = new TextDecoder();

        if (reader) {
          setMessages((prevMessages) => [
            ...prevMessages,
            { role: 'assistant', content: '' },
          ]);

          while (true) {
            const { done, value } = await reader.read();
            if (done) break;
            const chunk = decoder.decode(value, { stream: true });
            setMessages((prevMessages) => {
              const lastMessage = prevMessages[prevMessages.length - 1];
              const updatedMessages = prevMessages.slice(0, -1);
              return [
                ...updatedMessages,
                { ...lastMessage, content: lastMessage.content + chunk },
              ];
            });
          }
        }
      } catch (error) {
        console.error('Error:', error);
        setMessages((prevMessages) => [
          ...prevMessages,
          { role: 'assistant', content: 'Sorry, an error occurred. Please try again.' },
        ]);
      } finally {
        setIsTyping(false);
      }
    }
  };

  return (
    <div className="flex justify-center w-full h-[calc(100vh-64px)] text-white p-4">
      <main className="flex-1 flex flex-col overflow-hidden max-w-4xl w-full">
        <motion.div 
          className="flex-1 overflow-y-auto mb-4 bg-gray-800 rounded-lg shadow-xl p-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <AnimatePresence>
            {messages.map((message, index) => (
              <motion.div
                key={index}
                className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'} mb-4`}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
              >
                <div className={`flex items-start max-w-[80%] ${message.role === 'user' ? 'flex-row-reverse' : ''}`}>
                  <div className={`rounded-full p-2 ${message.role === 'user' ? 'bg-teal-600' : 'bg-gray-700'} ${message.role === 'user' ? 'ml-2' : 'mr-2'}`}>
                    {message.role === 'user' ? <User className="w-5 h-5" /> : <Bot className="w-5 h-5" />}
                  </div>
                  <div className={`${message.role === 'user' ? 'bg-teal-700' : 'bg-gray-700'} rounded-lg p-3`}>
                    <p className="text-sm">{message.content}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
          <div ref={messagesEndRef} />
        </motion.div>
        <motion.div 
          className="flex items-center bg-gray-800 rounded-lg shadow-xl p-2"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSend()}
            placeholder="Type your message here..."
            className="flex-grow bg-transparent text-white placeholder-gray-400 outline-none"
          />
          <motion.button 
            onClick={handleSend} 
            className="ml-2 bg-teal-600 text-white rounded-full p-2 transition duration-300"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            disabled={isTyping}
          >
            <Send className="w-5 h-5" />
          </motion.button>
        </motion.div>
      </main>
    </div>
  );
}

export default function ChatPage() {
  const { isLoaded, user } = useAuthCheck();

  if (!isLoaded) {
    return <LoadingSpinner />;
  }

  if (!user) {
    return null; // This will never render because useAuthCheck will redirect
  }

  return <ChatContent />;
}