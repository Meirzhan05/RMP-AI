'use client'
import { useForm } from 'react-hook-form'
import { useUser } from '@clerk/nextjs'
import { useRouter } from 'next/navigation'
import { motion } from 'framer-motion'

interface FormData {
  firstName: string;
  lastName: string;
  email: string;
  customName: string;
  customBio: string;
}

const AdditionalUpdate = () => {
  const router = useRouter()
  const { register, handleSubmit, formState: { errors } } = useForm<FormData>()
  const { isLoaded, isSignedIn, user } = useUser()

  const onSubmit = async (data: FormData) => {
    if (!user) return;
    try {
        await user.update({
            firstName: data.firstName,
            lastName: data.lastName,
        })
  
      router.push('/profile')
    } catch (error) {
      console.error('Error updating user information:', error)
      if (error instanceof Error) {
        alert(`Failed to update information: ${error.message}`)
      } else {
        alert('An unknown error occurred while updating information')
      }
    }
  }

  if (!isLoaded || !isSignedIn) {
    return null
  }

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { 
        duration: 0.5,
        staggerChildren: 0.1
      }
    }
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.3 }
    }
  }

  return (
    <div className="w-full min-h-screen pt-16 flex flex-col justify-center items-center">
      <motion.div 
        className="max-w-md w-full mx-auto bg-gray-800 rounded-lg shadow-xl p-8 mt-4"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.h1 variants={itemVariants} className="text-3xl font-bold text-center mb-8 text-white">Update Information</motion.h1>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <motion.div variants={itemVariants}>
            <label className="block text-sm font-medium text-gray-300 mb-2" htmlFor="firstName">
              First Name
            </label>
            <input
              defaultValue={user.firstName || ''}
              {...register('firstName', { required: true })}
              className="w-full px-3 py-2 text-white bg-gray-700 border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent"
            />
            {errors.firstName && <span className="text-red-400 text-sm">This field is required</span>}
          </motion.div>
          <motion.div variants={itemVariants}>
            <label className="block text-sm font-medium text-gray-300 mb-2" htmlFor="lastName">
              Last Name
            </label>
            <input
              defaultValue={user.lastName || ''}
              {...register('lastName', { required: true })}
              className="w-full px-3 py-2 text-white bg-gray-700 border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent"
            />
            {errors.lastName && <span className="text-red-400 text-sm">This field is required</span>}
          </motion.div>
          <motion.div variants={itemVariants}>
            <motion.button
              type="submit"
              className="w-full bg-teal-500 hover:bg-teal-600 text-white font-bold py-3 px-4 rounded-md transition duration-300"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Update
            </motion.button>
          </motion.div>
        </form>
      </motion.div>
    </div>
  )
}

export default AdditionalUpdate