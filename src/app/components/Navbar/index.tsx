"use client";
import React, { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import GithubIcon from "../Icons/GithubIcon";
import Spinner from "../Spinner"
import Link from "next/link";
import ProfileDropdown from "./Profiledown";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [loading,setloading] = useState(false)
  const [searchQuery, setSearchQuery] = useState("");
  const pathname = usePathname(); // Get current route
  const [user, setUser] = useState({
    "_id": "",
    "googleId": "",
    "email": "",
    "displayName": "",
    "firstName": "",
    "lastName": "",
    "image": "",
    "createdAt": "",
    "updatedAt": "",
    "__v": 0
  })
  useEffect(() => {
    async function fetchUser() {
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/auth/profile`, {
          credentials: "include",
        });
        const data = await response.json();
        // console.log(data)
        if (!data.success) {
          return ;
           // Save user details
        }
        setUser(data.data);
      } catch (error) {
        console.error("Error fetching user:", error);

      }
    }
    setloading(true)
    fetchUser();
    setloading(false)
    // console.log(user)
  }, []);
  return (
    <div>
      {loading && (
        <div className="fixed inset-0 flex items-center justify-center bg-white bg-opacity-75 z-50">
          <Spinner />
        </div>
      )}
      {!loading && <div className="fixed inset-x-0 top-0 z-10 border-b border-gray-950/5 dark:border-white/10">
        <div className="bg-[#161D29]">
          <div className="flex h-14 items-center justify-between gap-4 md:h-[75px] px-4 sm:px-6">
            <Link className="shrink-0 text-2xl font-semibold" aria-label="Home" href="/">
              Placement
            </Link>

            {/* Search Bar */}
            <div className="flex-1 flex justify-center max-md:hidden">
              <input
                type="text"
                placeholder="Search..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-80 px-4 py-2 border rounded-md bg-white/10 border-[rgb(44,51,63)] focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* Desktop Menu */}
            <div className="flex items-center gap-6 max-md:hidden text-xl">
              {[
                { name: "Home", href: "/" },
                { name: "Blogs", href: "/blogs" },
                { name: "Blog", href: "/blog" },
                { name: "Post", href: "/createPost" },
              ].map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`${pathname === link.href ? "text-[#FFE83D]" : "text-gray-950 dark:text-white"
                    }`}
                >
                  {link.name}
                </Link>
              ))}

              <Link
                className="text-gray-950 dark:text-white"
                href="https://github.com/mnkraj/Placement"
              >
                <GithubIcon />
              </Link>
              {!user.email && <Link href={`${process.env.NEXT_PUBLIC_BACKEND_URL}/auth/google`}>
                <button className="rounded-[8px] border border-[#445163] bg-[#161D29] px-[12px] py-[8px] text-[#AFBEBF]">
                  Login
                </button>
              </Link>}
              {user.email && <ProfileDropdown />}
            </div>

            {/* Mobile Menu Button */}
            <div className="flex items-center gap-2.5 md:hidden">
              <button
                type="button"
                className="relative inline-grid size-7 place-items-center rounded-md text-gray-950 hover:bg-gray-950/5 dark:text-white dark:hover:bg-white/10"
                aria-label="Toggle navigation"
                onClick={() => setIsMenuOpen(!isMenuOpen)}
              >
                {isMenuOpen ? (
                  <svg viewBox="0 0 16 16" fill="currentColor" className="size-4">
                    <path
                      fillRule="evenodd"
                      d="M3.72 3.72a.75.75 0 1 1 1.06-1.06L8 5.94l3.22-3.22a.75.75 0 1 1 1.06 1.06L9.06 8l3.22 3.22a.75.75 0 0 1-1.06 1.06L8 9.06l-3.22 3.22a.75.75 0 1 1-1.06-1.06L6.94 8 3.72 4.78a.75.75 0 0 1 0-1.06Z"
                      clipRule="evenodd"
                    />
                  </svg>
                ) : (
                  <svg viewBox="0 0 16 16" fill="currentColor" className="size-4">
                    <path
                      fillRule="evenodd"
                      d="M2 4.75A.75.75 0 0 1 2.75 4h10.5a.75.75 0 0 1 0 1.5H2.75A.75.75 0 0 1 2 4.75Zm0 6.5a.75.75 0 0 1 .75-.75h10.5a.75.75 0 0 1 0 1.5H2.75a.75.75 0 0 1-.75-.75Z"
                      clipRule="evenodd"
                    />
                  </svg>
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu with Search Bar */}
        {isMenuOpen && (
          <div className="lg:hidden bg-white dark:bg-gray-950 px-4 sm:px-6 border-t border-gray-950/5 dark:border-white/10">
            <div className="py-4 flex flex-col gap-4 text-xl">
              {/* Search Bar for Mobile */}
              <input
                type="text"
                placeholder="Search..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full px-4 py-2 bg-white/10 border rounded-md border-[rgb(44,51,63)] focus:outline-none focus:ring-2 focus:ring-blue-500"
              />

              {[
                { name: "Home", href: "/" },
                { name: "Blogs", href: "/blogs" },
                { name: "Blog", href: "/blog" },
                { name: "Post", href: "/createPost" },
              ].map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`${pathname === link.href ? "text-[#FFE83D]" : "text-gray-950 dark:text-white"
                    } `}
                >
                  {link.name}
                </Link>
              ))}

              <Link className=" text-gray-950 dark:text-white" href="https://github.com/mnkraj/Placement">
                Github
              </Link>
              {!user.email && <Link className=" text-gray-950 dark:text-white" href={`${process.env.NEXT_PUBLIC_BACKEND_URL}/auth/google`}>
                Login
              </Link>}
              {user.email && <ProfileDropdown />}
            </div>
          </div>
        )}
      </div>}
    </div>
  );
};

export default Navbar;
