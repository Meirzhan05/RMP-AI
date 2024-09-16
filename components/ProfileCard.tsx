import React from 'react'
import { motion } from 'framer-motion'

type Professor = {
    id: number;
    name: string;
    department: string;
    rating: number;
    institution_name: string;
}

const ProfessorCard = ({ professor, handleViewProfessor }: { professor: Professor, handleViewProfessor: (id: number) => void }) => (
  <motion.div 
    className="bg-gray-800 rounded-lg overflow-hidden shadow-lg p-4"
    whileHover={{ scale: 1.05 }}
    transition={{ type: "spring", stiffness: 300 }}
  >
    <h3 className="text-xl font-semibold text-white mb-2">{professor.name}</h3>
    <p className="text-gray-400 mb-3">{professor.department}</p>
    <div className="flex justify-between items-center">
      <div>
        <span className="text-sm text-gray-400">Rating</span>
        <span className="text-lg font-semibold text-white ml-2">{professor.rating ? `${professor.rating}/5.0` : 'N/A'}</span>
      </div>
      <motion.button 
        className="bg-teal-500 hover:bg-teal-600 text-white px-3 py-1 rounded-md transition duration-300 ease-in-out text-sm"
        onClick={() => handleViewProfessor(professor.id)}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
      >
        View Profile
      </motion.button>
    </div>
  </motion.div>
)

export default ProfessorCard