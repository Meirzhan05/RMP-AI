'use client'
import { useUser } from '@clerk/nextjs'
import Image from 'next/image'
import Link from 'next/link'

const ViewProfile = () => {
  const { isLoaded, isSignedIn, user } = useUser()
  if (!isLoaded || !isSignedIn) {
    return null
  }
  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-4xl font-bold text-center mb-8 text-white">Your Profile</h1>
      <div className="bg-white bg-opacity-10 backdrop-blur-md rounded-xl p-8 max-w-4xl mx-auto">
        <div className="flex flex-col md:flex-row items-center md:items-start">
          <div className="mb-6 md:mb-0 md:mr-8">
            <Image
              src={user.imageUrl}
              width={250}
              height={250}
              alt={user.fullName || 'User Profile'}
              className="rounded-full shadow-lg"
            />
          </div>
          <div className="flex-grow">
            <table className="w-full text-white">
              <tbody>
                <tr className="border-b border-purple-400">
                  <td className="py-3 font-semibold">First Name</td>
                  <td className="py-3">{user.firstName}</td>
                </tr>
                <tr className="border-b border-purple-400">
                  <td className="py-3 font-semibold">Last Name</td>
                  <td className="py-3">{user.lastName}</td>
                </tr>
                <tr className="border-b border-purple-400">
                  <td className="py-3 font-semibold">Emails</td>
                  <td className="py-3">
                    {user.emailAddresses.map((email) => (
                      <div key={email.emailAddress}>{email.emailAddress}</div>
                    ))}
                  </td>
                </tr>
              </tbody>
            </table>
            <div className="mt-8 text-center">
              <Link href="/additional">
                <button className="bg-purple-600 hover:bg-purple-700 text-white font-bold py-3 px-6 rounded-full transition duration-300 transform hover:scale-105">
                  Update Information
                </button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ViewProfile