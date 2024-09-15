"use client"
import React, { useState } from 'react';
import { Send, User, Bot } from 'lucide-react';


interface Message {
    role: 'user' | 'assistant';
    content: string;
}

export default function ChatPage() {
    const [messages, setMessages] = useState<Message[]>([]);
    const [input, setInput] = useState('');
    // const [isLoading, setIsLoading] = useState(false);

    const handleSend = async () => {
        if (input.trim()) {
            setMessages((messages) => [
                ...messages,
                {role: 'user', content: input},
                {role: 'assistant', content: ''},
            ])

            setInput('');
            fetch('/api/chat', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify([...messages, {role: 'user', content: input}]),
            }).then(async (res) => {
                const reader = res.body?.getReader();
                const decoder = new TextDecoder();

                const result = '';
                return reader?.read().then(function processText({ done, value }){
                    if (done) {
                        return result;
                    }
                    const chunk = decoder.decode(value || new Uint8Array(), { stream: true });
                    setMessages((messages) => {
                        const lastMessages = messages[messages.length - 1];
                        const otherMessages = messages.slice(0, messages.length - 1);
                        return [
                            ...otherMessages,
                            {...lastMessages, content: lastMessages.content + chunk},
                        ]
                    });
                    return reader?.read().then(processText);
                });
            });
        }
  };

  return (
    <div className="flex justify-center w-full h-[calc(100vh-64px)] bg-gradient-to-br from-purple-900 via-indigo-800 to-blue-900 text-white p-4">
      <main className="flex-1 flex flex-col overflow-hidden max-w-7xl">
        <div className="flex-1 overflow-y-auto mb-4 bg-white bg-opacity-10 backdrop-blur-md rounded-xl p-4">
          {messages.map((message, index) => (
            <div key={index} className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'} mb-4`}>
              <div className={`flex items-start max-w-[80%] ${message.role === 'user' ? 'flex-row-reverse' : ''}`}>
                <div className={`rounded-full p-2 ${message.role === 'user' ? 'bg-purple-600' : 'bg-indigo-600'} ${message.role === 'user' ? 'ml-2' : 'mr-2'}`}>
                  {message.role === 'user' ? <User className="w-5 h-5" /> : <Bot className="w-5 h-5" />}
                </div>
                <div className={`${message.role === 'user' ? 'bg-purple-700' : 'bg-indigo-700'} rounded-lg p-3`}>
                  <p className="text-sm">{message.content}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="flex items-center bg-white bg-opacity-10 backdrop-blur-md rounded-xl p-2">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSend()}
            placeholder="Type your message here..."
            className="flex-grow bg-transparent text-white placeholder-gray-400 outline-none"
          />
          <button onClick={handleSend} className="ml-2 bg-purple-600 hover:bg-purple-700 text-white rounded-full p-2 transition duration-300 transform hover:scale-105">
            <Send className="w-5 h-5" />
          </button>
        </div>
      </main>
    </div>
  );
}