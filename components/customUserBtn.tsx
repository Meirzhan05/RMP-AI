'use client'

import { useUser, useClerk } from "@clerk/nextjs"
import { useState } from "react"
import Image from 'next/image'
import Link from "next/link"
import { ChevronDown, User, LogOut } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'

export default function CustomUserButton() {
  const { user } = useUser()
  const { signOut } = useClerk()
  const [isOpen, setIsOpen] = useState(false)

  if (!user) return null

  return (
    <div className="relative">
      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center space-x-2 bg-gray-800 rounded-full pr-4 pl-1 py-1 transition-colors hover:bg-gray-700"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        <Image
          src={user.imageUrl}
          alt="User avatar"
          width={32}
          height={32}
          className="rounded-full filter hue-rotate-90 saturate-150"
        />
        <span className="text-gray-300 text-sm font-medium">{user.firstName}</span>
        <ChevronDown className="w-4 h-4 text-gray-400" />
      </motion.button>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="absolute right-0 mt-2 w-48 bg-gray-800 rounded-md shadow-lg py-1 z-10"
          >
            <Link href="/profile">
              <motion.a
                className="flex items-center px-4 py-2 text-sm text-gray-300 hover:bg-gray-700 hover:text-teal-400 transition-colors"
                whileHover={{ x: 5 }}
              >
                <User className="w-4 h-4 mr-2" />
                Manage Account
              </motion.a>
            </Link>
            <motion.button
              onClick={() => signOut()}
              className="flex items-center w-full px-4 py-2 text-sm text-gray-300 hover:bg-gray-700 hover:text-teal-400 transition-colors"
              whileHover={{ x: 5 }}
            >
              <LogOut className="w-4 h-4 mr-2" />
              Sign out
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}