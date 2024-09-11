'use client'
import { useUser, useClerk } from "@clerk/nextjs";
import { useState } from "react";
import Link from "next/link";
export default function CustomUserButton() {
  const { user } = useUser();
  const { signOut } = useClerk();
  const [isOpen, setIsOpen] = useState(false);

  if (!user) return null;

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center space-x-2"
      >
        <img
          src={user.imageUrl}
          alt="User avatar"
          className="w-8 h-8 rounded-full"
        />
        <span className="text-white">{user.firstName}</span>
      </button>
      {isOpen && (
        <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1">
            <Link
                href="/profile"
                className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left"
            >
            Manage Account
          </Link>
          <button
            onClick={() => signOut()}
            className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left"
          >
            Sign out
          </button>
        </div>
      )}
    </div>
  );
}