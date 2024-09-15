'use client'
import { useState, useMemo } from 'react'
import { useEffect } from 'react'

import { FixedSizeGrid as Grid } from 'react-window'
import AutoSizer from 'react-virtualized-auto-sizer'
import ProfessorCard from '@/components/ProfileCard'
import { useUser } from '@clerk/nextjs'
import { useRouter } from 'next/navigation'

type Professor = {
    id: number;
    name: string;
    department: string;
    rating: number;
    institution_name: string;
  }
  
  async function fetchProfessors(): Promise<Professor[]> {
    const response = await fetch('/api/professors');
    if (!response.ok) {
      throw new Error('Failed to fetch professors');
    }
    return response.json();
  }
  

export default function Dashboard() {
    const [isClient, setIsClient] = useState(false)
    const [allProfessors, setAllProfessors] = useState<Professor[]>([])
    const { user } = useUser()
    const router = useRouter()
    if (!user) {
        router.push('/sign-in')
    }

    useEffect(() => {
      setIsClient(true)
      fetchProfessors().then(professors => setAllProfessors(professors))
    }, [])

  const [searchTerm, setSearchTerm] = useState('')
  const [selectedDepartment, setSelectedDepartment] = useState('All')
  const [currentPage, setCurrentPage] = useState(1)
  const professorsPerPage = 24

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
    fetch(`/api/professorInfo`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ id: id})
    }).then(response => response.json())
    .then(data => {
      console.log(data)
    })

  }



  return (
    <div className="w-full ">
      <div className="max-w-7xl mx-auto bg-purple-700 rounded-lg p-8">
        <h2 className="text-4xl font-bold text-white mb-6">Dashboard</h2>
        <div className="flex flex-wrap justify-between items-center mb-8 gap-4">
          <div className="relative">
            <input
              type="text"
              placeholder="Search professors..."
              className="pl-10 pr-4 py-2 w-64 rounded-full bg-purple-600 text-white placeholder-purple-300 focus:outline-none focus:ring-2 focus:ring-purple-400"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <svg
              className="absolute left-3 top-1/2 transform -translate-y-1/2 text-purple-300 w-5 h-5"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
            </svg>
          </div>
          <select
            className="bg-purple-600 text-white rounded-md px-3 py-2 w-48 cursor-pointer transition-all duration-300 ease-in-out hover:bg-purple-500 focus:ring-2 focus:ring-purple-400 focus:outline-none"
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
                      <ProfessorCard professor={professor} handleViewProfessor={handleViewProfessor} />
                    </div>
                  ) : null
                }}
              </Grid>
            )}
          </AutoSizer>
        </div>
        <div className="mt-6 flex justify-center items-center">
          <button
            onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
            className="bg-purple-500 text-white px-4 py-2 rounded-md mr-2 disabled:opacity-50"
          >
            Previous
          </button>
          <span className="text-white mx-4">
            Page {currentPage} of {Math.ceil(filteredProfessors.length / professorsPerPage)}
          </span>
          <button
            onClick={() => setCurrentPage(prev => Math.min(prev + 1, Math.ceil(filteredProfessors.length / professorsPerPage)))}
            disabled={currentPage === Math.ceil(filteredProfessors.length / professorsPerPage)}
            className="bg-purple-500 text-white px-4 py-2 rounded-md ml-2 disabled:opacity-50"
          >
            Next
          </button>
        </div>
      </div>
    </div>
  )
}