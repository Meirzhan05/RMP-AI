'use client'

import { useState } from 'react'
import { X, Loader2 } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'

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

export default function ProfessorSummaryPopUp({ professor, professorSummaryJSON, setProfessorSummaryJSON, open, setOpen, isLoading, setIsLoading }: { professor: Professor, professorSummaryJSON: ProfessorSummaryJSON, setProfessorSummaryJSON: (professorSummaryJSON: ProfessorSummaryJSON) => void, open: boolean, setOpen: (open: boolean) => void, isLoading: boolean, setIsLoading: (isLoading: boolean) => void}) {
  const [isSaving, setIsSaving] = useState(false)

  const handleSave = () => {
    setIsSaving(true)
    setTimeout(() => {
      setIsSaving(false)
      console.log('Saved!')
    }, 2000)
  }

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

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4"
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            transition={{ type: 'spring', damping: 20, stiffness: 300 }}
            className="bg-gray-900 text-white rounded-lg max-w-2xl w-full relative"
          >
            <AnimatePresence>
              {isLoading && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="absolute inset-0 bg-gray-900 bg-opacity-75 flex items-center justify-center z-10"
                >
                  <motion.div
                    animate={{
                      rotate: 360,
                      transition: { duration: 1.5, repeat: Infinity, ease: 'linear' }
                    }}
                    className="w-24 h-24 border-4 border-t-blue-500 border-b-blue-700 border-l-transparent border-r-transparent rounded-full"
                  />
                </motion.div>
              )}
            </AnimatePresence>
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className="absolute top-4 right-4 text-gray-400 hover:text-white"
              onClick={handleClose}
            >
              <X size={24} />
            </motion.button>
            <div className={`p-6 space-y-6 ${isLoading ? 'opacity-50' : ''}`}>
              <motion.div
                initial={{ y: -20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.2 }}
                className="space-y-2"
              >
                <h2 className="text-3xl font-bold">{professor.name}</h2>
                <p className="text-gray-400">Here is the summary of the professor</p>
              </motion.div>
              <motion.div
                initial={{ y: -20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.3 }}
                className="grid grid-cols-2 gap-4 text-sm"
              >
                <div>
                  <span className="text-gray-400">Department:</span>
                </div>
                <div className="text-right">{professor.department}</div>
                <div>
                  <span className="text-gray-400">School:</span>
                </div>
                <div className="text-right">{professor.institution_name}</div>
                <div>
                  <span className="text-gray-400">Difficulty Level:</span>
                </div>
                <div className="text-right">{professor.rating}</div>
              </motion.div>
              <motion.p
                initial={{ y: -20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.4 }}
                className="text-sm"
              >
                {professorSummaryJSON.summary}
              </motion.p>
              <motion.div
                initial={{ y: -20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.5 }}
                className="space-y-4"
              >
                <div>
                  <h3 className="text-green-500 font-semibold mb-2">Pros:</h3>
                  <ul className="list-disc list-inside text-sm space-y-1">
                    {professorSummaryJSON.pros.map((pro, index) => (
                      <motion.li
                        key={index}
                        initial={{ x: -20, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        transition={{ delay: 0.6 + index * 0.1 }}
                      >
                        {pro}
                      </motion.li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h3 className="text-red-500 font-semibold mb-2">Cons:</h3>
                  <ul className="list-disc list-inside text-sm space-y-1">
                    {professorSummaryJSON.cons.map((con, index) => (
                      <motion.li
                        key={index}
                        initial={{ x: -20, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        transition={{ delay: 0.8 + index * 0.1 }}
                      >
                        {con}
                      </motion.li>
                    ))}
                  </ul>
                </div>
              </motion.div>
              <motion.div
                initial={{ y: -20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 1 }}
              >
                <h3 className="text-orange-500 font-semibold mb-2">Recommendation:</h3>
                <p className="text-sm">
                  {professorSummaryJSON.recommendation}
                </p>
              </motion.div>
              <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 1.1 }}
                className="flex justify-end space-x-4 mt-6"
              >
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-6 py-2 bg-gray-700 text-white rounded-full hover:bg-gray-600 transition-colors"
                  onClick={handleClose}
                >
                  Cancel
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleSave}
                  disabled={isSaving || isLoading}
                  className="px-6 py-2 bg-yellow-400 text-gray-900 rounded-full hover:bg-yellow-300 transition-colors disabled:bg-yellow-200 disabled:text-gray-600"
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