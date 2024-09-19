'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Star, Trash2, Search, BookOpen, Zap } from 'lucide-react'

interface BookmarkItem {
  id: string
  title: string
  url: string
  favorite: boolean
}

export default function BookmarksPage() {
    const [bookmarks, setBookmarks] = useState<BookmarkItem[]>([
        { id: '1', title: 'Professor Smith - Biology', url: 'https://smartrate.com/professors/smith', favorite: true },
        { id: '3', title: 'Dr. Williams - Mathematics', url: 'https://smartrate.com/professors/williams', favorite: true },
    ])

    const [searchTerm, setSearchTerm] = useState('')


    const deleteBookmark = (id: string) => {
        setBookmarks(bookmarks.filter(bookmark => bookmark.id !== id))
    }

    const filteredBookmarks = bookmarks.filter(bookmark =>
        bookmark.title.toLowerCase().includes(searchTerm.toLowerCase())
    )

    return (
        <div className="min-h-screen w-full text-white p-8 m-16">
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
        >
            <h2 className="text-4xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-teal-400 to-blue-500">Your Knowledge Hub</h2>
            <p className="text-gray-400 mb-8">Curate your academic journey with smart bookmarks</p>
        </motion.div>

        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="mb-8"
        >
            <div className="flex flex-wrap gap-4 mb-4">
            <div className="relative flex-grow">
                <input
                type="text"
                placeholder="Search bookmarks..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full p-2 pl-10 bg-gray-800 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-400"
                />
                <Search className="absolute left-3 top-2.5 text-gray-400" size={20} />
            </div>

            </div>
        </motion.div>
        
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.6 }}
        >
            <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredBookmarks.map((bookmark, index) => (
                <motion.li
                key={bookmark.id}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
                className="bg-gray-800 p-4 rounded-lg shadow-md flex flex-col justify-between"
                >
                <div>
                    <div className="flex items-center justify-between mb-2">
                    {bookmark.category === 'professor' ? (
                        <BookOpen className="text-teal-400" size={20} />
                    ) : (
                        <Zap className="text-yellow-400" size={20} />
                    )}
                    <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={() => toggleFavorite(bookmark.id)}
                        className={`p-1 rounded-full ${bookmark.favorite ? 'text-yellow-400 hover:text-yellow-500' : 'text-gray-400 hover:text-gray-300'}`}
                        aria-label={bookmark.favorite ? "Remove from favorites" : "Add to favorites"}
                    >
                        <Star size={20} />
                    </motion.button>
                    </div>
                    <a href={bookmark.url} target="_blank" rel="noopener noreferrer" className="text-teal-400 hover:underline font-medium block mb-1">
                    {bookmark.title}
                    </a>
                    <p className="text-sm text-gray-400 truncate">{bookmark.url}</p>
                </div>
                <div className="flex justify-end mt-4">
                    <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => deleteBookmark(bookmark.id)}
                    className="p-1 rounded-full text-red-400 hover:text-red-500"
                    aria-label="Delete bookmark"
                    >
                    <Trash2 size={20} />
                    </motion.button>
                </div>
                </motion.li>
            ))}
            </ul>
        </motion.div>
        </div>
    )
}