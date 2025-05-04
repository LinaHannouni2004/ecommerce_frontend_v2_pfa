"use client";
import React from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useUser, UserButton, SignedIn, SignedOut, SignInButton, SignUpButton } from '@clerk/nextjs';
import { appleImg, searchImg, bagImg } from '../utils';
import { navLists } from '../constants';

function Header() {
  const router = useRouter();
  const { isSignedIn } = useUser();

  const handleNavClick = (navItem) => {
    if (navItem === "Store" && isSignedIn) {
      router.push('/products');
    }
    // else: no navigation or add other navigation logic if needed
  };

  return (
    <header className="bg-black w-full py-5 sm:px-10 px-5 flex justify-between items-center">
      {/* Logo */}
      <div className="flex items-center">
        <Image src='/logoWeb.svg' alt='logo' width={50} height={50} />
      </div>

      {/* Navigation principale */}
      <nav className="hidden md:flex flex-1 justify-center">
        {navLists.map((navItem) => (
          <div
            key={navItem}
            className="px-5 w-20 text-sm cursor-pointer text-gray-500 hover:text-white transition-colors"
            onClick={() => handleNavClick(navItem)}
          >
            {navItem}
          </div>
        ))}
      </nav>

      {/* Icônes et actions */}
      <div className="flex items-center gap-6">
        <div className="flex gap-4">
         
          
        </div>

        {/* Boutons login/register */}
        <div className="hidden sm:flex gap-4 ml-4">
          <SignedIn>
            <UserButton afterSignOutUrl="/" />
          </SignedIn>
          <SignedOut>
            <SignInButton mode="modal">
              <button className="px-4 py-2 text-sm text-white hover:text-gray-300">
                Login
              </button>
            </SignInButton>
            <SignUpButton mode="modal">
              <button className="px-4 py-2 text-sm bg-white text-black rounded-md hover:bg-gray-200">
                Register
              </button>
            </SignUpButton>
          </SignedOut>
        </div>

        {/* Menu mobile */}
        <button className="md:hidden rounded-sm bg-gray-800 p-2 text-gray-300">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
      </div>
    </header>
  );
}

export default Header;
