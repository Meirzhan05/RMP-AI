'use client'

import Link from "next/link"
import { useState } from "react"
import { Menu, X } from "lucide-react"
import CustomUserButton from "./customUserBtn"

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-gray-900 bg-opacity-80 backdrop-blur-md">
      <nav className="container mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          <Link href="/" className="text-2xl font-bold text-white hover:text-teal-400 transition-colors">
            SmartRate
          </Link>
          <div className="hidden md:flex items-center space-x-6">
            {["Dashboard", "Chat", "Bookmarks"].map((item) => (
              <Link
                key={item}
                href={`/${item.toLowerCase()}`}
                className="text-gray-300 hover:text-teal-400 transition-colors"
              >
                {item}
              </Link>
            ))}
            <CustomUserButton />
          </div>
          <button
            className="md:hidden text-white hover:text-teal-400 transition-colors"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </nav>
      {isMenuOpen && (
        <div className="md:hidden bg-gray-800 py-4">
          {["Dashboard", "Chat", "Bookmarks"].map((item) => (
            <Link
              key={item}
              href={`/${item.toLowerCase()}`}
              className="block px-4 py-2 text-gray-300 hover:bg-gray-700 hover:text-teal-400 transition-colors"
            >
              {item}
            </Link>
          ))}
          <div className="px-4 py-2">
            <CustomUserButton />
          </div>
        </div>
      )}
    </header>
  )
}