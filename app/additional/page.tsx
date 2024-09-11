'use client'
import { useForm } from 'react-hook-form'
import { useUser } from '@clerk/nextjs'
import { useRouter } from 'next/navigation'


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
        await user.update(
            {
                firstName: data.firstName,
                lastName: data.lastName,
            }
        )
  
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

  return (
    <div className="container mx-auto px-6 py-12">
      <h1 className="text-4xl font-bold text-center mb-8 text-white">Update Information</h1>
      <form onSubmit={handleSubmit(onSubmit)} className="max-w-md mx-auto bg-white bg-opacity-10 backdrop-blur-md rounded-xl p-8">
        <div className="mb-6">
          <label className="block text-sm font-bold text-white mb-2" htmlFor="firstName">
            First Name
          </label>
          <input
            defaultValue={user.firstName || ''}
            {...register('firstName', { required: true })}
            className="w-full px-3 py-2 text-white bg-transparent border border-purple-400 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-600"
          />
          {errors.firstName && <span className="text-red-400 text-sm">This field is required</span>}
        </div>
        <div className="mb-6">
          <label className="block text-sm font-bold text-white mb-2" htmlFor="lastName">
            Last Name
          </label>
          <input
            defaultValue={user.lastName || ''}
            {...register('lastName', { required: true })}
            className="w-full px-3 py-2 text-white bg-transparent border border-purple-400 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-600"
          />
          {errors.lastName && <span className="text-red-400 text-sm">This field is required</span>}
        </div>
        <button
          type="submit"
          className="w-full bg-purple-600 hover:bg-purple-700 text-white font-bold py-3 px-4 rounded-full transition duration-300 transform hover:scale-105"
        >
          Update
        </button>
      </form>
    </div>
  )
}

export default AdditionalUpdate