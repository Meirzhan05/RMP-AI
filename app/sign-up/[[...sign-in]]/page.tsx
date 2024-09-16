'use client'

import * as Clerk from '@clerk/elements/common'
import * as SignUp from '@clerk/elements/sign-up'
import Link from 'next/link'
import { motion } from 'framer-motion'

export default function SignUpPage() {
  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { 
        duration: 0.5,
        staggerChildren: 0.1
      }
    }
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.3 }
    }
  }

  return (
      <motion.div 
        className="bg-gray-800 rounded-lg shadow-xl p-8 w-full max-w-md border border-gray-700"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.h1 variants={itemVariants} className="text-3xl font-bold text-center mb-6 text-white">Create an account</motion.h1>
        <SignUp.Root>
          <SignUp.Step name="start" className="flex flex-col gap-y-4">
            <motion.div variants={itemVariants}>
              <Clerk.Connection name="google" className="w-full bg-white text-gray-800 py-3 rounded-md hover:bg-gray-100 transition duration-300 flex items-center justify-center font-medium shadow-md">
                <Clerk.Icon className="mr-2" />
                Sign up with Google
              </Clerk.Connection>
            </motion.div>

            <motion.div variants={itemVariants}>
              <Clerk.Field name="emailAddress" className="space-y-2">
                <Clerk.Label className="text-sm font-medium text-gray-300">Email</Clerk.Label>
                <Clerk.Input className="w-full border border-gray-600 rounded-md py-2 px-3 bg-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent transition duration-200" />
                <Clerk.FieldError className="text-red-500 text-sm" />
              </Clerk.Field>
            </motion.div>

            <motion.div variants={itemVariants}>
              <Clerk.Field name="password" className="space-y-2">
                <Clerk.Label className="text-sm font-medium text-gray-300">Password</Clerk.Label>
                <Clerk.Input className="w-full border border-gray-600 rounded-md py-2 px-3 bg-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent transition duration-200" />
                <Clerk.FieldError className="text-red-500 text-sm" />
              </Clerk.Field>
            </motion.div>

            <motion.div variants={itemVariants}>
              <SignUp.Action submit className="w-full bg-teal-500 text-white rounded-md py-2 px-4 font-medium hover:bg-teal-600 transition duration-300 shadow-md">
                Sign up
              </SignUp.Action>
            </motion.div>
          </SignUp.Step>

          <SignUp.Step name="continue" className="flex flex-col gap-y-4">
            <motion.h2 variants={itemVariants} className="text-2xl font-bold text-center mb-4 text-white">Fill in missing fields</motion.h2>

            <motion.div variants={itemVariants}>
              <Clerk.Field name="username" className="space-y-2">
                <Clerk.Label className="text-sm font-medium text-gray-300">Username</Clerk.Label>
                <Clerk.Input className="w-full border border-gray-600 rounded-md py-2 px-3 bg-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent transition duration-200" />
                <Clerk.FieldError className="text-red-500 text-sm" />
              </Clerk.Field>
            </motion.div>

            <motion.div variants={itemVariants}>
              <SignUp.Action submit className="w-full bg-teal-500 text-white rounded-md py-2 px-4 font-medium hover:bg-teal-600 transition duration-300 shadow-md">
                Continue
              </SignUp.Action>
            </motion.div>
          </SignUp.Step>

          <SignUp.Step name="verifications" className="flex flex-col gap-y-4">
            <SignUp.Strategy name="phone_code">
              <motion.h2 variants={itemVariants} className="text-2xl font-bold text-center mb-4 text-white">Check your phone for an SMS</motion.h2>

              <motion.div variants={itemVariants}>
                <Clerk.Field name="code" className="space-y-2">
                  <Clerk.Label className="text-sm font-medium text-gray-300">Phone Code</Clerk.Label>
                  <Clerk.Input className="w-full border border-gray-600 rounded-md py-2 px-3 bg-gray-700 text-white placeholder-gray-400 focus:outline-none focus: focus:ring-2 focus:ring-teal-500 focus:border-transparent transition duration-200" />
                  <Clerk.FieldError className="text-red-500 text-sm" />
                </Clerk.Field>
              </motion.div>

              <motion.div variants={itemVariants}>
                <SignUp.Action submit className="w-full bg-teal-500 text-white rounded-md py-2 px-4 font-medium hover:bg-teal-600 transition duration-300 shadow-md mt-4">
                  Verify
                </SignUp.Action>
              </motion.div>
            </SignUp.Strategy>

            <SignUp.Strategy name="email_code">
              <motion.h2 variants={itemVariants} className="text-2xl font-bold text-center mb-4 text-white">Check your email</motion.h2>

              <motion.div variants={itemVariants}>
                <Clerk.Field name="code" className="space-y-2">
                  <Clerk.Label className="text-sm font-medium text-gray-300">Email Code</Clerk.Label>
                  <Clerk.Input className="w-full border border-gray-600 rounded-md py-2 px-3 bg-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent transition duration-200" />
                  <Clerk.FieldError className="text-red-500 text-sm" />
                </Clerk.Field>
              </motion.div>

              <motion.div variants={itemVariants}>
                <SignUp.Action submit className="w-full bg-teal-500 text-white rounded-md py-2 px-4 font-medium hover:bg-teal-600 transition duration-300 shadow-md mt-4">
                  Verify
                </SignUp.Action>
              </motion.div>
            </SignUp.Strategy>
          </SignUp.Step>
        </SignUp.Root>
        <motion.div variants={itemVariants} className="mt-6 text-center">
          <p className="text-sm text-gray-400">
            Already have an account?{' '}
            <Link href="/sign-in" className="font-medium text-teal-400 hover:text-teal-300 transition duration-200">
              Sign in
            </Link>
          </p>
        </motion.div>
      </motion.div>
  )
}