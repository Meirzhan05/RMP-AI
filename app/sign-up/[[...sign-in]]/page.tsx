'use client'

import * as Clerk from '@clerk/elements/common'
import * as SignUp from '@clerk/elements/sign-up'
import Link from 'next/link'

export default function SignUpPage() {
  return (
    <div className="bg-white rounded-lg shadow-xl p-8 w-full max-w-md">
      <h1 className="text-3xl font-bold text-center mb-6 text-purple-800">Create an account</h1>
      <SignUp.Root>
        <SignUp.Step name="start" className="flex flex-col gap-y-4">
          <Clerk.Connection name="google" className="gap-x-3 w-full bg-white text-gray-700 py-3 rounded-md border border-gray-300 hover:bg-gray-50 transition duration-300 flex items-center justify-center font-medium">
            <Clerk.Icon />
            Sign up with Google
          </Clerk.Connection>

          <Clerk.Field name="emailAddress" className="space-y-2">
            <Clerk.Label className="text-sm font-medium text-black">Email</Clerk.Label>
            <Clerk.Input className="w-full border rounded-md py-1.5 px-2.5 text-black" />
            <Clerk.FieldError className="block text-red-500 text-sm" />
          </Clerk.Field>

          <Clerk.Field name="password" className="space-y-2">
            <Clerk.Label className="text-sm font-medium text-black">Password</Clerk.Label>
            <Clerk.Input className="w-full border rounded-md py-1.5 px-2.5 text-black" />
            <Clerk.FieldError className="block text-red-500 text-sm" />
          </Clerk.Field>

          <SignUp.Action submit className="bg-gradient-to-r from-purple-500 to-indigo-600 w-full text-white rounded-md py-1.5 px-2.5">
            Sign up
          </SignUp.Action>
        </SignUp.Step>

        <SignUp.Step name="continue" className="flex flex-col gap-y-4">
          <h1 className="text-2xl font-bold text-center mb-4 text-purple-800">Fill in missing fields</h1>

          <Clerk.Field name="username" className="space-y-2">
            <Clerk.Label className="text-sm font-medium text-black">Username</Clerk.Label>
            <Clerk.Input className="w-full border rounded-md py-1.5 px-2.5 text-black" />
            <Clerk.FieldError className="block text-red-500 text-sm" />
          </Clerk.Field>

          <SignUp.Action submit className="bg-gradient-to-r from-purple-500 to-indigo-600 w-full text-white rounded-md py-1.5 px-2.5">
            Continue
          </SignUp.Action>
        </SignUp.Step>

        <SignUp.Step name="verifications" className="flex flex-col gap-y-4">
          <SignUp.Strategy name="phone_code">
            <h1 className="text-2xl font-bold text-center mb-4 text-purple-800">Check your phone for an SMS</h1>

            <Clerk.Field name="code" className="space-y-2">
              <Clerk.Label className="text-sm font-medium text-black">Phone Code</Clerk.Label>
              <Clerk.Input className="w-full border rounded-md py-1.5 px-2.5 text-black" />
              <Clerk.FieldError className="block text-red-500 text-sm" />
            </Clerk.Field>

            <SignUp.Action submit className="bg-gradient-to-r from-purple-500 to-indigo-600 w-full text-white rounded-md py-1.5 px-2.5">
              Verify
            </SignUp.Action>
          </SignUp.Strategy>

          <SignUp.Strategy name="email_code">
            <h1 className="text-2xl font-bold text-center mb-4 text-purple-800">Check your email</h1>

            <Clerk.Field name="code" className="space-y-2">
              <Clerk.Label className="text-sm font-medium text-black">Email Code</Clerk.Label>
              <Clerk.Input className="w-full border rounded-md py-1.5 px-2.5 text-black" />
              <Clerk.FieldError className="block text-red-500 text-sm" />
            </Clerk.Field>

            <SignUp.Action submit className="bg-gradient-to-r from-purple-500 to-indigo-600 w-full text-white rounded-md py-1.5 px-2.5">
              Verify
            </SignUp.Action>
          </SignUp.Strategy>
        </SignUp.Step>
      </SignUp.Root>
      <div className="mt-6 text-center">
        <p className="text-sm text-gray-600">
          Already have an account?{' '}
          <Link href="/sign-in" className="font-medium text-indigo-600 hover:text-indigo-500">
            Sign in
          </Link>
        </p>
      </div>
    </div>
  )
}