'use client'

import * as Clerk from '@clerk/elements/common'
import * as SignIn from '@clerk/elements/sign-in'
import Link from 'next/link'
import { motion } from 'framer-motion'

export default function SignInPage() {
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
        <motion.h1 variants={itemVariants} className="text-3xl font-bold text-center mb-6 text-white">Sign In</motion.h1>
        <SignIn.Root>
          <SignIn.Step 
            name="start"
            className="flex flex-col gap-y-4"
          >
            <motion.div variants={itemVariants}>
              <Clerk.Connection name="google" className="w-full bg-white text-gray-800 py-3 rounded-md hover:bg-gray-100 transition duration-300 flex items-center justify-center font-medium shadow-md">
                <Clerk.Icon className="mr-2" />
                Sign in with Google
              </Clerk.Connection>
            </motion.div>

            <motion.div variants={itemVariants}>
              <Clerk.Field name="identifier" className="space-y-2">
                <Clerk.Label className="text-sm font-medium text-gray-300">Email</Clerk.Label>
                <Clerk.Input className="w-full border border-gray-600 rounded-md py-2 px-3 bg-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent transition duration-200" />
                <Clerk.FieldError className="text-red-500 text-sm" />
              </Clerk.Field>
            </motion.div>

            <motion.div variants={itemVariants}>
              <SignIn.Action submit className="w-full bg-teal-500 text-white rounded-md py-2 px-4 font-medium hover:bg-teal-600 transition duration-300 shadow-md">
                Continue
              </SignIn.Action>
            </motion.div>
          </SignIn.Step>

          <SignIn.Step name="verifications" className="flex flex-col gap-y-4">
            <SignIn.Strategy name="email_code">
              <motion.h2 variants={itemVariants} className="text-2xl font-bold text-center mb-4 text-white">Check your email</motion.h2>
              <motion.p variants={itemVariants} className="text-center text-gray-400 mb-4">
                We sent a code to <SignIn.SafeIdentifier/>.
              </motion.p>

              <motion.div variants={itemVariants}>
                <Clerk.Field name="code" className="space-y-2">
                  <Clerk.Label className="text-sm font-medium text-gray-300">Email code</Clerk.Label>
                  <Clerk.Input className="w-full border border-gray-600 rounded-md py-2 px-3 bg-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent transition duration-200" />
                  <Clerk.FieldError className="text-red-500 text-sm" />
                </Clerk.Field>
              </motion.div>

              <motion.div variants={itemVariants}>
                <SignIn.Action submit className="w-full bg-teal-500 text-white rounded-md py-2 px-4 font-medium hover:bg-teal-600 transition duration-300 shadow-md mt-4">
                  Verify
                </SignIn.Action>
              </motion.div>
            </SignIn.Strategy>

            <SignIn.Strategy name="password">
              <motion.div variants={itemVariants}>
                <Clerk.Field name="password" className="space-y-2">
                  <Clerk.Label className="text-sm font-medium text-gray-300">Password</Clerk.Label>
                  <Clerk.Input className="w-full border border-gray-600 rounded-md py-2 px-3 bg-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent transition duration-200" />
                  <Clerk.FieldError className="text-red-500 text-sm" />
                </Clerk.Field>
              </motion.div>

              <motion.div variants={itemVariants}>
                <SignIn.Action submit className="w-full bg-teal-500 text-white rounded-md py-2 px-4 font-medium hover:bg-teal-600 transition duration-300 shadow-md mt-4">
                  Continue
                </SignIn.Action>
              </motion.div>
              <motion.div variants={itemVariants}>
                <SignIn.Action navigate="forgot-password" className="text-center text-sm text-teal-400 hover:text-teal-300 mt-2">
                  Forgot password?
                </SignIn.Action>
              </motion.div>
            </SignIn.Strategy>
          </SignIn.Step>

          <SignIn.Step name="forgot-password" className="flex flex-col gap-y-4">
            <SignIn.SupportedStrategy name="reset_password_email_code">
              <motion.div variants={itemVariants}>
                <SignIn.Action submit className="w-full bg-teal-500 text-white rounded-md py-2 px-4 font-medium hover:bg-teal-600 transition duration-300 shadow-md">
                  Reset password
                </SignIn.Action>
              </motion.div>
            </SignIn.SupportedStrategy>

            <motion.div variants={itemVariants}>
              <SignIn.Action navigate="previous" className="text-center text-sm text-teal-400 hover:text-teal-300">
                Go back
              </SignIn.Action>
            </motion.div>
          </SignIn.Step>

          <SignIn.Step name="reset-password" className="space-y-4">
            <motion.h2 variants={itemVariants} className="text-2xl font-bold text-center mb-4 text-white">Reset your password</motion.h2>

            <motion.div variants={itemVariants}>
              <Clerk.Field name="password" className="space-y-2">
                <Clerk.Label className="text-sm font-medium text-gray-300">New password</Clerk.Label>
                <Clerk.Input className="w-full border border-gray-600 rounded-md py-2 px-3 bg-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent transition duration-200" />
                <Clerk.FieldError className="text-red-500 text-sm" />
              </Clerk.Field>
            </motion.div>

            <motion.div variants={itemVariants}>
              <Clerk.Field name="confirmPassword" className="space-y-2">
                <Clerk.Label className="text-sm font-medium text-gray-300">Confirm password</Clerk.Label>
                <Clerk.Input className="w-full border border-gray-600 rounded-md py-2 px-3 bg-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent transition duration-200" />
                <Clerk.FieldError className="text-red-500 text-sm" />
              </Clerk.Field>
            </motion.div>

            <motion.div variants={itemVariants}>
              <SignIn.Action submit className="w-full bg-teal-500 text-white rounded-md py-2 px-4 font-medium hover:bg-teal-600 transition duration-300 shadow-md">
                Reset password
              </SignIn.Action>
            </motion.div>
          </SignIn.Step>
        </SignIn.Root>
        
        <motion.div variants={itemVariants} className="mt-6 text-center">
          <p className="text-sm text-gray-400">
            Don't have an account?{' '}
            <Link href="/sign-up" className="font-medium text-teal-400 hover:text-teal-300 transition duration-200">
              Sign up
            </Link>
          </p>
        </motion.div>
      </motion.div>
  )
}