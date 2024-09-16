'use client'

import { useState, useMemo, useEffect } from 'react'
import { useUser } from '@clerk/nextjs'
import { useRouter } from 'next/navigation'
import { FixedSizeGrid as Grid } from 'react-window'
import AutoSizer from 'react-virtualized-auto-sizer'
import { motion } from 'framer-motion'
import { Search, ChevronLeft, ChevronRight } from 'lucide-react'
import ProfessorCard from '@/components/ProfileCard'
import ProfessorSummaryPopUp from '@/components/professerSummaryPopUp'

type Professor = {
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

async function fetchProfessors(): Promise<Professor[]> {
  const response = await fetch('/api/professors');
  if (!response.ok) {
    throw new Error('Failed to fetch professors');
  }
  return response.json();
}

export default function Dashboard() {
  const [allProfessors, setAllProfessors] = useState<Professor[]>([])
  const [professor, setProfessor] = useState<Professor | null>(null)
  const [professorSummaryJSON, setProfessorSummaryJSON] = useState<ProfessorSummaryJSON | null>(null)
  const { user } = useUser()
  const router = useRouter()
  const [open, setOpen] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedDepartment, setSelectedDepartment] = useState('All')
  const [currentPage, setCurrentPage] = useState(1)
  const professorsPerPage = 24

  useEffect(() => {
    if (!user) {
      router.push('/sign-in')
    } else {
      fetchProfessors().then(professors => setAllProfessors(professors))
    }
  }, [user, router])

  const filteredProfessors = useMemo(() => {
    return allProfessors.filter(prof => 
      (selectedDepartment === 'All' || prof.department === selectedDepartment) &&
      (prof.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
       prof.department.toLowerCase().includes(searchTerm.toLowerCase()))
    )
  }, [allProfessors, searchTerm, selectedDepartment])

  const paginatedProfessors = useMemo(() => {
    const startIndex = (currentPage - 1) * professorsPerPage
    return filteredProfessors.slice(startIndex, startIndex + professorsPerPage)
  }, [filteredProfessors, currentPage])

  const departments = useMemo(() => 
    ['All', ...Array.from(new Set(allProfessors.map(prof => prof.department))).sort()],
    [allProfessors]
  )

  const handleViewProfessor = (id: number) => {
    setIsLoading(true)
    setOpen(true)
    fetch(`/api/professorSummary`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ id: id})
    })
    .then(response => {
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return response.json();
    })
    .then(data => {
      if (data && Object.keys(data).length > 0) {
        setProfessorSummaryJSON(data);
      } else {
        throw new Error('Empty or invalid response');
      }
    })
    .catch(error => {
      console.error('Error fetching professor summary:', error);
    })
    .finally(() => {
      setIsLoading(false)
    });
    setProfessor(allProfessors.find(prof => prof.id === id) || null)
  }

  return (
    <div className="w-full min-h-screen pt-16 flex flex-col justify-center items-center">
      <motion.div 
        className="max-w-7xl w-full mx-auto bg-gray-800 rounded-lg shadow-xl p-6 md:p-8 mt-4"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >

        <h2 className="text-3xl md:text-4xl font-bold mb-6 text-teal-400">Dashboard</h2>
        <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4">
          <div className="relative w-full md:w-64">
            <input
              type="text"
              placeholder="Search professors..."
              className="w-full pl-10 pr-4 py-2 rounded-full bg-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-teal-500"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          </div>
          <select
            className="w-full md:w-48 bg-gray-700 text-white rounded-md px-3 py-2 cursor-pointer transition-all duration-300 ease-in-out hover:bg-gray-600 focus:ring-2 focus:ring-teal-500 focus:outline-none"
            value={selectedDepartment}
            onChange={(e) => setSelectedDepartment(e.target.value)}
          >
            {departments.map(dept => (
              <option key={dept} value={dept}>{dept}</option>
            ))}
          </select>
        </div>
        <div className="h-[600px] w-full">
          <AutoSizer>
            {({ height, width }) => (
              <Grid
                className="List"
                height={height}
                width={width}
                columnCount={3}
                columnWidth={width / 3}
                rowCount={Math.ceil(paginatedProfessors.length / 3)}
                rowHeight={200}
                itemData={paginatedProfessors}
              >
                {({ columnIndex, rowIndex, style }) => {
                  const professor = paginatedProfessors[rowIndex * 3 + columnIndex]
                  return professor ? (
                    <div style={style} className="p-2">
                      <ProfessorCard professor={professor} handleViewProfessor={handleViewProfessor}/>
                    </div>
                  ) : null
                }}
              </Grid>
            )}
          </AutoSizer>
        </div>
        <div className="mt-6 flex justify-center items-center">
          <motion.button
            onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
            className="bg-teal-600 text-white px-4 py-2 rounded-md mr-2 disabled:opacity-50 disabled:cursor-not-allowed"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <ChevronLeft className="w-5 h-5" />
          </motion.button>
          <span className="text-white mx-4">
            Page {currentPage} of {Math.ceil(filteredProfessors.length / professorsPerPage)}
          </span>
          <motion.button
            onClick={() => setCurrentPage(prev => Math.min(prev + 1, Math.ceil(filteredProfessors.length / professorsPerPage)))}
            disabled={currentPage === Math.ceil(filteredProfessors.length / professorsPerPage)}
            className="bg-teal-600 text-white px-4 py-2 rounded-md ml-2 disabled:opacity-50 disabled:cursor-not-allowed"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <ChevronRight className="w-5 h-5" />
          </motion.button>
        </div>
      </motion.div>
      <ProfessorSummaryPopUp 
        professor={professor || {
          id: 0,
          name: '',
          department: '',
          rating: 0,
          institution_name: ''
        }} 
        professorSummaryJSON={professorSummaryJSON || {
          summary: '',
          pros: [],
          cons: [],
          recommendation: ''
        }} 
        open={open} 
        setOpen={setOpen} 
        isLoading={isLoading}
        setIsLoading={setIsLoading}
        setProfessorSummaryJSON={setProfessorSummaryJSON}
      />
    </div>
  )
}