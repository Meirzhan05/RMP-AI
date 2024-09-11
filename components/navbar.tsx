'use client'
import Link from "next/link";
import CustomUserButton from "./customUserBtn";
export default function Navbar() {
  return (
    <header className="top-0 left-0 right-0 z-50 bg-black bg-opacity-20 backdrop-blur-md">
        <nav className="container mx-auto px-6 py-3">
            <div className="flex items-center justify-between">
                <div className="text-2xl font-bold text-white">
                  <Link href="/">SmartRate</Link>
                </div>
                <div className="flex items-center space-x-4">
                    <div className="hidden md:flex space-x-4">
                        <Link href="/dashboard" className="text-white hover:text-purple-300 transition duration-300">Dashboard</Link>
                        <Link href="/about" className="text-white hover:text-purple-300 transition duration-300">About</Link>
                        <Link href="/contact" className="text-white hover:text-purple-300 transition duration-300">Contact</Link>
                    </div>
                    <CustomUserButton />
                </div>
            </div>
        </nav>
    </header>
  )
}