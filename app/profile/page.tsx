'use client'

import { useUser } from '@clerk/nextjs'
import Image from 'next/image'
import Link from 'next/link'
import { Mail, User, Pencil, LucideIcon } from 'lucide-react'
import { motion } from 'framer-motion'

const ViewProfile = () => {
  const { isLoaded, isSignedIn, user } = useUser()

  if (!isLoaded || !isSignedIn) {
    return null
  }

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 0.5, staggerChildren: 0.1 } }
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
  }

  return (
    <motion.div
      className="container mx-auto px-4 py-12"
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      <motion.h1 
        className="text-4xl font-bold text-center mb-8 text-white"
        variants={itemVariants}
      >
        Your Profile
      </motion.h1>
      <motion.div 
        className="bg-gray-800 rounded-xl p-8 max-w-4xl mx-auto shadow-lg"
        variants={itemVariants}
      >
        <div className="flex flex-col md:flex-row items-center md:items-start">
          <motion.div 
            className="mb-6 md:mb-0 md:mr-8"
            variants={itemVariants}
          >
            <Image
              src={user.imageUrl}
              width={200}
              height={200}
              alt={user.fullName || 'User Profile'}
              className="rounded-full shadow-lg filter hue-rotate-90 saturate-150"
            />
          </motion.div>
          <div className="flex-grow">
            <motion.div className="space-y-4" variants={containerVariants}>
              <ProfileItem icon={User} label="First Name" value={user.firstName || ''} />
              <ProfileItem icon={User} label="Last Name" value={user.lastName || ''} />
              <motion.div className="flex items-start" variants={itemVariants}>
                <Mail className="w-5 h-5 text-teal-400 mr-3 mt-1" />
                <div>
                  <p className="text-gray-400 text-sm">Emails</p>
                  {user.emailAddresses.map((email) => (
                    <p key={email.emailAddress} className="text-white">{email.emailAddress}</p>
                  ))}
                </div>
              </motion.div>
            </motion.div>
            <motion.div 
              className="mt-8 text-center"
              variants={itemVariants}
            >
              <Link href="/additional">
                <motion.button
                  className="bg-teal-500 hover:bg-teal-600 text-white font-bold py-3 px-6 rounded-full transition-all hover:scale-105 inline-flex items-center"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Pencil className="w-4 h-4 mr-2" />
                  Update Information
                </motion.button>
              </Link>
            </motion.div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  )
}

const ProfileItem = ({ icon: Icon, label, value }: { icon: LucideIcon, label: string, value: string }) => {
  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
  }
  return (
    <motion.div className="flex items-center" variants={itemVariants}>
    <Icon className="w-5 h-5 text-teal-400 mr-3" />
    <div>
      <p className="text-gray-400 text-sm">{label}</p>
      <p className="text-white">{value}</p>
    </div>
  </motion.div>
  )
}

export default ViewProfile