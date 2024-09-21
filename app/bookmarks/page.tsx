'use client'

import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { Search, Trash2, GraduationCap, Book } from 'lucide-react'
import StarRating from '@/components/starRating'
import { useUser } from '@clerk/nextjs'
import ProfessorExistingSummaryPopUp from '@/components/professorExistingSummaryPopUp'

interface ProfessorBookmark {
    name: string;
    summary: string;
    pros: string[];
    cons: string[];
    recommendation: string;
    professor_id: string;
    professor: {
        id: string;
        name: string;
        department: string;
        rating: number;
        institution_name: string;
    },
}

export default function BookmarksPage() {
    const [bookmarkedProf, setBookmarkedProf] = useState<ProfessorBookmark[]>([])
    const [selectedProf, setSelectedProf] = useState<ProfessorBookmark | null>(null);
    const {user} = useUser();
    const [open, isOpen] = useState(false);
    const [searchTerm, setSearchTerm] = useState('')

    const handleClick = (prof: ProfessorBookmark) => {
        setSelectedProf(prof);
        isOpen(true);
    }

    const deleteBookmark = async (id: string) => {
        try {
            const response = await fetch('/api/bookmarks', {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ professorId: id }), 
            });
    
            if (!response.ok) {
                throw new Error('Failed to delete bookmark');
            }
            setBookmarkedProf(bookmarkedProf);
        } catch (error) {
            console.error('Error deleting bookmark:', error);
        }
    };

    const filteredBookmarks = bookmarkedProf.filter(bookmark =>
        bookmark.professor.name?.toLowerCase().includes(searchTerm.toLowerCase())
    )

    useEffect(() => {
        const fetchBookmarks = async () => {
            if (!user) return;

            const response = await fetch(`/api/bookmarks?userId=${user.id}`);
            if (!response.ok) {
                console.error('Failed to fetch bookmarks:', response.statusText);
                return; // Exit if the response is not ok
            }
            const data = await response.json();
            console.log('Fetched bookmarks:', data); // Log the fetched data
            setBookmarkedProf(data);
        };

        if (user) {
            fetchBookmarks();
        }
    }, [user])

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
                <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredBookmarks.map((bookmark, index) => (
                    <motion.li
                        key={bookmark.professor.id}
                        initial={{ opacity: 0, scale: 0.9, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        transition={{ duration: 0.3, delay: index * 0.1 }}
                        className="bg-gray-800 p-6 rounded-xl cursor-pointer shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2"
                        onClick={() => handleClick(bookmark)} // {{ edit_4 }}
                    >
                    <div className="flex items-center justify-between mb-4">
                        <GraduationCap className="text-teal-400" size={28} />
                        <motion.button
                        whileHover={{ scale: 1.1, rotate: 15 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={() => deleteBookmark(bookmark.professor.id)}
                        className="p-2 rounded-full bg-red-500 text-white hover:bg-red-600 transition-colors"
                        aria-label="Delete professor"
                        >
                        <Trash2 size={20} />
                        </motion.button>
                    </div>
                    <h3 className="text-xl font-bold text-teal-400 mb-2">{bookmark.professor.name}</h3>
                    <div className="flex items-center text-gray-300 mb-2">
                        <Book className="mr-2" size={16} />
                        <span>{bookmark.professor.department}</span>
                    </div>
                    
                    <StarRating rating={bookmark.professor.rating} />
                    </motion.li>
                ))}
                </ul>
            </motion.div>
            {open && selectedProf && (
                <ProfessorExistingSummaryPopUp
                    setOpen={isOpen}
                    professorSummaryJSON={{
                        name: selectedProf.professor.name,
                        summary: selectedProf.summary.summary,
                        pros: selectedProf.summary.pros,
                        cons: selectedProf.summary.cons,
                        recommendation: selectedProf.summary.recommendation,
                    }}
                />
            )}
        </div>
    )
}