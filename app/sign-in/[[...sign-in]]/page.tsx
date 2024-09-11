'use client'

import * as Clerk from '@clerk/elements/common'
import * as SignIn from '@clerk/elements/sign-in'
import Link from 'next/link'

export default function SignInPage() {
  return (
    <div className="bg-white rounded-lg shadow-xl p-8 w-full max-w-md">
      <h1 className="text-3xl font-bold text-center mb-6 text-purple-800">Sign In</h1>
      <SignIn.Root>
        <SignIn.Step 
          name="start"
          className="flex flex-col gap-y-4"
        >
          <Clerk.Connection name="google" className="gap-x-3 w-full bg-white text-gray-700 py-3 rounded-md border border-gray-300 hover:bg-gray-50 transition duration-300 flex items-center justify-center font-medium">
            <Clerk.Icon />
            Sign in with Google
          </Clerk.Connection>
          <Clerk.Field name="identifier" className="space-y-2">
            <Clerk.Label className="text-sm font-medium text-black">Email</Clerk.Label>
            <Clerk.Input className="w-full border rounded-md py-1.5 px-2.5 text-black" />
            <Clerk.FieldError className="block text-red-500 text-sm" />
          </Clerk.Field>

          <SignIn.Action submit className="bg-gradient-to-r from-purple-500 to-indigo-600 w-full text-white rounded-md py-1.5 px-2.5">
            Continue
          </SignIn.Action>
        </SignIn.Step>

        <SignIn.Step name="verifications" className="flex flex-col gap-y-4">
          <SignIn.Strategy name="email_code">
            <h2 className="text-2xl font-bold text-center mb-4 text-purple-800">Check your email</h2>
            <p className="text-center text-gray-600">
              We sent a code to <SignIn.SafeIdentifier/>.
            </p>

            <Clerk.Field name="code" className="space-y-2">
              <Clerk.Label className="text-sm font-medium text-black">Email code</Clerk.Label>
              <Clerk.Input className="w-full border rounded-md py-1.5 px-2.5 text-black" />
              <Clerk.FieldError className="block text-red-500 text-sm" />
            </Clerk.Field>

            <SignIn.Action submit className="bg-gradient-to-r from-purple-500 to-indigo-600 w-full text-white rounded-md py-1.5 px-2.5">
              Continue
            </SignIn.Action>
          </SignIn.Strategy>

          <SignIn.Strategy name="password">
            <Clerk.Field name="password" className="space-y-2">
              <Clerk.Label className="text-sm font-medium text-black">Password</Clerk.Label>
              <Clerk.Input className="w-full border rounded-md py-1.5 px-2.5 text-black" />
              <Clerk.FieldError className="block text-red-500 text-sm" />
            </Clerk.Field>

            <SignIn.Action submit className="bg-gradient-to-r from-purple-500 to-indigo-600 w-full text-white rounded-md py-1.5 px-2.5">
              Continue
            </SignIn.Action>
            <SignIn.Action navigate="forgot-password" className="text-center text-sm text-indigo-600 hover:text-indigo-500">
              Forgot password?
            </SignIn.Action>
          </SignIn.Strategy>

          <SignIn.Strategy name="reset_password_email_code">
            <h2 className="text-2xl font-bold text-center mb-4 text-purple-800">Check your email</h2>
            <p className="text-center text-gray-600">
              We sent a code to <SignIn.SafeIdentifier />.
            </p>

            <Clerk.Field name="code" className="space-y-2">
              <Clerk.Label className="text-sm font-medium text-black">Email code</Clerk.Label>
              <Clerk.Input className="w-full border rounded-md py-1.5 px-2.5 text-black" />
              <Clerk.FieldError className="block text-red-500 text-sm" />
            </Clerk.Field>

            <SignIn.Action submit className="bg-gradient-to-r from-purple-500 to-indigo-600 w-full text-white rounded-md py-1.5 px-2.5">
              Continue
            </SignIn.Action>
          </SignIn.Strategy>
        </SignIn.Step>

        <SignIn.Step name="forgot-password" className="flex flex-col gap-y-4">

          <SignIn.SupportedStrategy name="reset_password_email_code">
            <SignIn.Action submit className="bg-gradient-to-r from-purple-500 to-indigo-600 w-full text-white rounded-md py-1.5 px-2.5">
              Reset password
            </SignIn.Action>
          </SignIn.SupportedStrategy>

          <SignIn.Action navigate="previous" className="text-center text-sm text-indigo-600 hover:text-indigo-500">
            Go back
          </SignIn.Action>
        </SignIn.Step>

        <SignIn.Step name="reset-password" className="space-y-4">
          <h2 className="text-2xl font-bold text-center mb-4 text-purple-800">Reset your password</h2>

          <Clerk.Field name="password" className="space-y-2">
            <Clerk.Label className="text-sm font-medium text-black">New password</Clerk.Label>
            <Clerk.Input className="w-full border rounded-md py-1.5 px-2.5 text-black" />
            <Clerk.FieldError className="block text-red-500 text-sm" />
          </Clerk.Field>

          <Clerk.Field name="confirmPassword" className="space-y-2">
            <Clerk.Label className="text-sm font-medium text-black">Confirm password</Clerk.Label>
            <Clerk.Input className="w-full border rounded-md py-1.5 px-2.5 text-black" />
            <Clerk.FieldError className="block text-red-500 text-sm" />
          </Clerk.Field>

          <SignIn.Action submit className="bg-gradient-to-r from-purple-500 to-indigo-600 w-full text-white rounded-md py-1.5 px-2.5">
            Reset password
          </SignIn.Action>
        </SignIn.Step>
      </SignIn.Root>
      
      <div className="mt-6 text-center">
        <p className="text-sm text-gray-600">
          Don't have an account?{' '}
          <Link href="/sign-up" className="font-medium text-indigo-600 hover:text-indigo-500">
            Sign up
          </Link>
        </p>
      </div>
    </div>
  )
}