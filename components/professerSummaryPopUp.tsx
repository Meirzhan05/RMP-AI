'use client'

import { useState } from 'react'
import { X, Loader2 } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { useUser } from '@clerk/nextjs';

interface Professor {
  id: number;
  name: string;
  department: string;
  rating: number;
  institution_name: string;
}

interface ProfessorSummaryJSON {
  summary: string;
  pros: string[];
  cons: string[];
  recommendation: string;
}

export default function ProfessorSummaryPopUp({ professor, professorSummaryJSON, setProfessorSummaryJSON, open, setOpen, isLoading }: { professor: Professor, professorSummaryJSON: ProfessorSummaryJSON, setProfessorSummaryJSON: (professorSummaryJSON: ProfessorSummaryJSON) => void, open: boolean, setOpen: (open: boolean) => void, isLoading: boolean, setIsLoading: (isLoading: boolean) => void}) {
    const [isSaving, setIsSaving] = useState(false)
    const { user } = useUser()
    const handleSave = async () => {
      setIsSaving(true);
      try {
          const response = await fetch('/api/bookmarks', {
              method: 'POST',
              headers: {
                  'Content-Type': 'application/json',
              },
              body: JSON.stringify({
                userId: user?.id,
                professorId: professor.id,
                  professorSummaryJSON,
              }),
          });

          if (!response.ok) {
              throw new Error('Failed to save bookmark');
          }

          const data = await response.json();
          console.log('Bookmark saved with ID:', data.id);
      } catch (error) {
          console.error('Error saving bookmark:', error);
      } finally {
          setIsSaving(false);
      }
  };

    const handleClose = () => {
      setOpen(false)
      setProfessorSummaryJSON({
        summary: '',
        pros: [],
        cons: [],
        recommendation: ''
      })
    }

    if (!open) return null

    const containerVariants = {
      hidden: { opacity: 0 },
      visible: { 
        opacity: 1,
        transition: { 
          when: "beforeChildren",
          staggerChildren: 0.1,
          duration: 0.3
        }
      },
      exit: {
        opacity: 0,
        transition: { 
          when: "afterChildren",
          staggerChildren: 0.05,
          staggerDirection: -1,
          duration: 0.2
        }
      }
    }

    const itemVariants = {
      hidden: { y: 20, opacity: 0 },
      visible: { 
        y: 0, 
        opacity: 1,
        transition: { type: "spring", stiffness: 300, damping: 24 }
      },
      exit: { y: -20, opacity: 0 }
    }

    return (
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50 backdrop-blur-sm"
          >
            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              className="bg-[#1c1f2e] text-white rounded-lg w-full max-w-4xl mx-auto relative shadow-xl overflow-hidden"
            >
              <AnimatePresence>
                {isLoading && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="absolute inset-0 bg-[#1c1f2e] bg-opacity-75 flex items-center justify-center z-10 rounded-lg"
                  >
                    <motion.div
                      animate={{
                        rotate: 360,
                        transition: { duration: 1.5, repeat: Infinity, ease: 'linear' }
                      }}
                      className="w-16 h-16 border-4 border-t-[#4fd1c5] border-b-[#4fd1c5] border-l-transparent border-r-transparent rounded-full"
                    />
                  </motion.div>
                )}
              </AnimatePresence>
              <motion.button
                whileHover={{ scale: 1.1, rotate: 90 }}
                whileTap={{ scale: 0.9 }}
                className="absolute top-4 right-4 text-gray-400 hover:text-white transition-colors duration-200"
                onClick={handleClose}
              >
                <X size={24} />
              </motion.button>
              <div className={`p-8 space-y-6 ${isLoading ? 'opacity-50' : ''}`}>
                <motion.div variants={itemVariants} className="space-y-2">
                  <h2 className="text-3xl font-bold text-[#4fd1c5]">{professor.name}</h2>
                  <p className="text-gray-400">Professor Summary</p>
                </motion.div>
                <motion.div variants={itemVariants} className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="text-gray-400">Department:</span>
                  </div>
                  <div className="text-right">{professor.department}</div>
                  <div>
                    <span className="text-gray-400">School:</span>
                  </div>
                  <div className="text-right">{professor.institution_name}</div>
                  <div>
                    <span className="text-gray-400">Rating:</span>
                  </div>
                  <div className="text-right text-[#4fd1c5] font-bold">{professor.rating ? `${professor.rating}/5.0` : 'N/A'}</div>
                </motion.div>
                <motion.p variants={itemVariants} className="text-sm text-gray-300">
                  {professorSummaryJSON.summary}
                </motion.p>
                <motion.div variants={itemVariants} className="space-y-4">
                  <div>
                    <h3 className="text-[#4fd1c5] font-semibold mb-2">Pros:</h3>
                    <ul className="list-disc list-inside text-sm space-y-1 text-gray-300">
                      {professorSummaryJSON.pros.map((pro, index) => (
                        <motion.li
                          key={index}
                          variants={itemVariants}
                          className="transition-all duration-200 hover:text-white"
                        >
                          {pro}
                        </motion.li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <h3 className="text-[#f56565] font-semibold mb-2">Cons:</h3>
                    <ul className="list-disc list-inside text-sm space-y-1 text-gray-300">
                      {professorSummaryJSON.cons.map((con, index) => (
                        <motion.li
                          key={index}
                          variants={itemVariants}
                          className="transition-all duration-200 hover:text-white"
                        >
                          {con}
                        </motion.li>
                      ))}
                    </ul>
                  </div>
                </motion.div>
                <motion.div variants={itemVariants}>
                  <h3 className="text-[#ed8936] font-semibold mb-2">Recommendation:</h3>
                  <p className="text-sm text-gray-300">
                    {professorSummaryJSON.recommendation}
                  </p>
                </motion.div>
                <motion.div
                  variants={itemVariants}
                  className="flex justify-end space-x-4 mt-6"
                >
                  <motion.button
                    whileHover={{ scale: 1.05, backgroundColor: "#4a5568" }}
                    whileTap={{ scale: 0.95 }}
                    className="px-6 py-2 bg-gray-700 text-white rounded-full transition-colors duration-200"
                    onClick={handleClose}
                  >
                    Cancel
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.05, backgroundColor: "#45b7ab" }}
                    whileTap={{ scale: 0.95 }}
                    onClick={handleSave}
                    disabled={isSaving || isLoading}
                    className="px-6 py-2 bg-[#4fd1c5] text-gray-900 rounded-full transition-colors duration-200 disabled:bg-[#2c7a73] disabled:text-gray-400"
                  >
                    {isSaving ? (
                      <>
                        <Loader2 className="animate-spin inline-block mr-2" size={16} />
                        Saving...
                      </>
                    ) : (
                      'Save'
                    )}
                  </motion.button>
                </motion.div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    )
}