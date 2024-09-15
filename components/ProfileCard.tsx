import React from 'react'

type Professor = {
    id: number;
    name: string;
    department: string;
    rating: number;
    institution_name: string;
}


const ProfessorCard = ({ professor }: { professor: Professor }) => (
    <div className="bg-purple-600 rounded-lg overflow-hidden shadow-lg p-4">
      <h3 className="text-xl font-semibold text-white mb-2">{professor.name}</h3>
      <p className="text-purple-200 mb-3">{professor.department}</p>
      <div className="flex justify-between items-center">
        <div>
          <span className="text-sm text-purple-200">Rating</span>
          <span className="text-lg font-semibold text-white ml-2">{professor.rating ? `${professor.rating}/5.0` : 'N/A'}</span>
        </div>
        <button className="bg-purple-500 hover:bg-purple-400 text-white px-3 py-1 rounded-md transition duration-300 ease-in-out text-sm">
          View Profile
        </button>
      </div>
    </div>
)

export default ProfessorCard