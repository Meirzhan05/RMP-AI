// components/professerSummaryPopUp.tsx
'use client'

import { X } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'

interface ProfessorSummaryJSON {
  name: string;
  summary: string;
  pros: string[];
  cons: string[];
  recommendation: string;
}

export default function ProfessorExistingSummaryPopUp({ professorSummaryJSON, setOpen }: { professorSummaryJSON: ProfessorSummaryJSON, setOpen: (open: boolean) => void}) {
    const handleClose = () => {
        setOpen(false);
    }

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

    if (!professorSummaryJSON) return null;

    return (
        <AnimatePresence>
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
                    <motion.button
                        whileHover={{ scale: 1.1, rotate: 90 }}
                        whileTap={{ scale: 0.9 }}
                        className="absolute top-4 right-4 text-gray-400 hover:text-white transition-colors duration-200"
                        onClick={handleClose}
                    >
                        <X size={24} />
                    </motion.button>
                    <div className={`p-8 space-y-6`}>
                        <motion.div variants={itemVariants} className="space-y-2">
                            <h2 className="text-3xl font-bold text-[#4fd1c5]">{professorSummaryJSON.name}</h2>
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
                        </motion.div>
                    </div>
                </motion.div>
            </motion.div>
        </AnimatePresence>
    )
}