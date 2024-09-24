'use client'

import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Search, Trash2, GraduationCap, Book, ChevronLeft, ChevronRight } from 'lucide-react'
import StarRating from '@/components/starRating'
import { useUser } from '@clerk/nextjs'
import ProfessorExistingSummaryPopUp from '@/components/professorExistingSummaryPopUp'
import { useRouter } from 'next/navigation'

interface ProfessorBookmark {
    name: string;
    summary: {
        summary: string;
        pros: string[];
        cons: string[];
        recommendation: string;
    };
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
    const { user, isLoaded } = useUser()
    const router = useRouter()
    const [bookmarkedProf, setBookmarkedProf] = useState<ProfessorBookmark[]>([])
    const [selectedProf, setSelectedProf] = useState<ProfessorBookmark | null>(null);
    const [open, setOpen] = useState(false);
    const [searchTerm, setSearchTerm] = useState('')
    const [currentPage, setCurrentPage] = useState(1)
    const professorsPerPage = 12

    const handleClick = (prof: ProfessorBookmark) => {
        setSelectedProf(prof);
        setOpen(true);
    }

    const deleteBookmark = async (id: string, event: React.MouseEvent) => {
        event.stopPropagation();
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
            setBookmarkedProf(bookmarkedProf.filter(prof => prof.professor.id !== id));
        } catch (error) {
            console.error('Error deleting bookmark:', error);
        }
    };

    const filteredBookmarks = bookmarkedProf.filter(bookmark =>
        bookmark.professor.name?.toLowerCase().includes(searchTerm.toLowerCase())
    )

    const indexOfLastProfessor = currentPage * professorsPerPage;
    const indexOfFirstProfessor = indexOfLastProfessor - professorsPerPage;
    const currentProfessors = filteredBookmarks.slice(indexOfFirstProfessor, indexOfLastProfessor);

    const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

    useEffect(() => {
        if (isLoaded && !user) {
            router.push('/')
        }
    }, [isLoaded, user, router])

    useEffect(() => {
        const fetchBookmarks = async () => {
            if (!user) return;

            const response = await fetch(`/api/bookmarks?userId=${user.id}`);
            if (!response.ok) {
                console.error('Failed to fetch bookmarks:', response.statusText);
                return;
            }
            const data = await response.json();
            setBookmarkedProf(data);
        };

        if (user) {
            fetchBookmarks();
        }
    }, [user])

    if (!isLoaded || !user) {
        return null;
    }

    return (
        <div className="w-full px-4 sm:px-6 lg:px-8 text-white">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="text-center mb-8"
            >
                <h2 className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-teal-400 to-blue-500">Your Knowledge Hub</h2>
            </motion.div>

            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="mb-8"
            >
                <div className="max-w-2xl mx-auto">
                    <div className="relative">
                        <input
                            type="text"
                            placeholder="Search bookmarks..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-full p-2 pl-10 bg-gray-800 text-white placeholder-gray-400 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-400"
                        />
                        <Search className="absolute left-3 top-2.5 text-gray-400" size={20} />
                    </div>
                </div>
            </motion.div>
        
            <AnimatePresence mode="wait">
                <motion.div
                    key={currentPage}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.5 }}
                >
                    {currentProfessors.length > 0 ? (
                        <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                            {currentProfessors.map((bookmark, index) => (
                                <motion.li
                                    key={bookmark.professor.id}
                                    initial={{ opacity: 0, scale: 0.9, y: 20 }}
                                    animate={{ opacity: 1, scale: 1, y: 0 }}
                                    transition={{ duration: 0.3, delay: index * 0.1 }}
                                    className="bg-gray-800 p-6 rounded-xl cursor-pointer shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2"
                                    onClick={() => handleClick(bookmark)}
                                >
                                    <div className="flex items-center justify-between mb-4">
                                        <GraduationCap className="text-teal-400" size={28} />
                                        <motion.button
                                            whileHover={{ scale: 1.1, rotate: 15 }}
                                            whileTap={{ scale: 0.9 }}
                                            onClick={(e) => deleteBookmark(bookmark.professor.id, e)}
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
                    ) : (
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5 }}
                            className="text-center py-16 bg-gray-800 rounded-xl"
                        >
                            <GraduationCap className="mx-auto text-teal-400 mb-4" size={48} />
                            <p className="text-xl text-gray-400 mb-4">No bookmarks found.</p>
                            <p className="text-gray-500">Start adding professors to your knowledge hub!</p>
                        </motion.div>
                    )}
                </motion.div>
            </AnimatePresence>

            {filteredBookmarks.length > professorsPerPage && (
                <div className="flex justify-center mt-8 space-x-2">
                    <button
                        onClick={() => paginate(currentPage - 1)}
                        disabled={currentPage === 1}
                        className="px-3 py-2 rounded-md bg-gray-700 text-white disabled:opacity-50 disabled:cursor-not-allowed"
                        aria-label="Previous page"
                    >
                        <ChevronLeft className="h-4 w-4" />
                    </button>
                    {Array.from({ length: Math.ceil(filteredBookmarks.length / professorsPerPage) }).map((_, index) => (
                        <button
                            key={index}
                            onClick={() => paginate(index + 1)}
                            className={`px-3 py-2 rounded-md ${currentPage === index + 1 ? 'bg-teal-500 text-white' : 'bg-gray-700 text-white'}`}
                        >
                            {index + 1}
                        </button>
                    ))}
                    <button
                        onClick={() => paginate(currentPage + 1)}
                        disabled={currentPage === Math.ceil(filteredBookmarks.length / professorsPerPage)}
                        className="px-3 py-2 rounded-md bg-gray-700 text-white disabled:opacity-50 disabled:cursor-not-allowed"
                        aria-label="Next page"
                    >
                        <ChevronRight className="h-4 w-4" />
                    </button>
                </div>
            )}

            {open && selectedProf && (
                <ProfessorExistingSummaryPopUp
                    setOpen={setOpen}
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