"use client";
import { useState } from "react";
import Link from "next/link";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className="sticky top-0 left-0 w-full bg-violet-100 shadow-xl z-50 transition-all duration-300 bg-gradient-to-r from-violet-300 to-violet-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Logo/Brand */}
          <div className="flex-shrink-0 flex items-center">
            <Link
              href="/"
              className="text-2xl font-bold text-gray-600 hover:text-violet-700 transition-colors"
            >
              WorkConnect
            </Link>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-4">
              <Link
                href="/"
                className="text-gray-700 hover:text-violet-600 px-3 py-2 rounded-md text-lg font-medium transition-colors"
              >
                Home
              </Link>
              <Link
                href="/workers"
                className="text-gray-500 hover:text-violet-600 px-3 py-2 rounded-md text-lg font-medium transition-colors"
              >
                Workers
              </Link>
              <Link
                href="/services"
                className="text-gray-500 hover:text-violet-600 px-3 py-2 rounded-md text-lg font-medium transition-colors"
              >
                Services
              </Link>
              <Link
                href="/about"
                className="text-gray-500 hover:text-violet-600 px-3 py-2 rounded-md text-lg font-medium transition-colors"
              >
                About
              </Link>
              <Link
                href="/contact"
                className="text-gray-500 hover:text-violet-600 px-3 py-2 rounded-md text-lg font-medium transition-colors"
              >
                Contact
              </Link>
            </div>
          </div>

          {/* CTA Button (Desktop) */}
          <div className="hidden md:block">
            {/* <button className="bg-gradient-to-r from-violet-500 to-violet-200 hover:bg-gradient-to-r hover:from-violet-200 hover:to-violet-500 bg-violet-600 hover:bg-violet-700 text-white px-4 py-2 rounded-md text-sm font-medium transition-colors hover:transition-all cursor-pointer">
              Hire Now
            </button> */}
            <button
              className="
  text-white px-4 py-2 rounded-md text-lg 
  transition-all duration-500 ease-in-out
  shadow-lg hover:shadow-xl cursor-pointer border-btn"
            >
              Hire Now
            </button>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              type="button"
              className="mobile-menu-button bg-gray-100 inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-violet-500"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              <span className="sr-only">Open main menu</span>
              {/* Hamburger icon */}
              <svg
                className="block h-6 w-6"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <div className={`md:hidden ${isMenuOpen ? "block" : "hidden"}`}>
        <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-white border-t">
          <Link
            href="/"
            className="text-gray-900 hover:text-violet-600 block px-3 py-2 rounded-md text-base font-medium"
          >
            Home
          </Link>
          <Link
            href="/workers"
            className="text-gray-500 hover:text-violet-600 block px-3 py-2 rounded-md text-base font-medium"
          >
            Workers
          </Link>
          <Link
            href="/services"
            className="text-gray-500 hover:text-violet-600 block px-3 py-2 rounded-md text-base font-medium"
          >
            Services
          </Link>
          <Link
            href="/about"
            className="text-gray-500 hover:text-violet-600 block px-3 py-2 rounded-md text-base font-medium"
          >
            About
          </Link>
          <Link
            href="/contact"
            className="text-gray-500 hover:text-violet-600 block px-3 py-2 rounded-md text-base font-medium"
          >
            Contact
          </Link>
          <div className="px-3 py-2">
            <button
              className="bg-gradient-to-r from-violet-500 to-violet-200 
  hover:bg-gradient-to-r hover:from-violet-200 hover:to-violet-500 
  text-gray-500 px-4 py-2 rounded-md text-base font-medium 
  transition-all duration-500 ease-in-out
  shadow-lg hover:shadow-xl cursor-pointer"
            >
              Hire Now
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
