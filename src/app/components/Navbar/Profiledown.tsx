import { useState } from "react";
import Link from "next/link";
import { AiOutlineCaretDown } from "react-icons/ai";
import { VscDashboard, VscSignOut } from "react-icons/vsc";
import Image from "next/image";
// import { useRouter } from "next/navigation";
import Spinner from "../Spinner"
import { useMediaQuery } from "react-responsive"; // For responsive behavior
// import { setGlobal } from "next/dist/trace";

export default function ProfileDropdown({ img }: { img: string }) {
  const [loading, setloading] = useState(false)
  const [open, setOpen] = useState(false);
  const isMobile = useMediaQuery({ maxWidth: 768 }); // Mobile che

  // Logout function
  const handlelogout = async () => {
    setloading(true)
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/auth/logout`, {
        credentials: "include",
        method: "GET",
        headers: {
          "Cache-Control": "no-cache",
          "Pragma": "no-cache",
          "Expires": "0"
        }
      });
      const data = await res.json();
      console.log("Logout Response:", data); // Debugging
      setloading(false)
      window.location.reload()
    } catch (error) {
      console.error("Error logging out:", error);
    } 
  };

  

  return (
    <div>
      {loading && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-950 bg-opacity-75 z-50">
          <Spinner />
        </div>
      )}
      {!loading && <div><div className="relative">
        {/* LAPTOP VIEW: Show profile image & dropdown */}
        {!isMobile ? (
          <>
            <button
              className="flex items-center gap-x-1 focus:outline-none"
              onClick={() => setOpen((prev) => !prev)}
            >
              <Image
                src={img || "https://lh3.googleusercontent.com/a/ACg8ocIM97eXOLk9aAtoWnYR03eQyw6wLsxXARkOTjaNo8Uc1fERgSST=s96-c"}
                className="aspect-square w-[30px] rounded-full object-cover"
                width={90}
                height={90}
                alt="Profile"
              />
              <AiOutlineCaretDown className="text-sm text-richblack-100" />
            </button>

            {/* Dropdown Menu */}
            {open && (
              <div className="absolute top-full right-0 mt-2 w-40 rounded-md border border-gray-700 bg-richblack-800 shadow-lg">
                <Link href="/profile">
                  <div
                    className="flex items-center gap-x-2 px-4 py-2 text-sm text-white hover:bg-gray-700"
                    onClick={() => setOpen(false)}
                  >
                    <VscDashboard className="text-lg" />
                    Dashboard
                  </div>
                </Link>
                <div
                  className="flex items-center gap-x-2 px-4 py-2 text-sm text-white hover:bg-gray-700 cursor-pointer"
                  onClick={async () => {
                    await handlelogout(); // Ensure logout completes
                    setOpen(false);
                  }}
                >
                  <VscSignOut className="text-lg" />
                  <span>Logout</span>
                </div>
              </div>
            )}
          </>
        ) : (
          // MOBILE VIEW: Show "Dashboard" & "Logout" directly
          <div className="flex flex-col gap-2 w-full text-white">
            <Link
              href="/profile"
              className="flex items-center gap-x-2 px-4 py-2 text-sm hover:bg-gray-700"
            >
              <VscDashboard className="text-lg" />
              Dashboard
            </Link>
            <div
              className="flex items-center gap-x-2 px-4 py-2 text-sm hover:bg-gray-700 cursor-pointer"
              onClick={handlelogout} // Direct call for mobile
            >
              <VscSignOut className="text-lg" />
              <span>Logout</span>
            </div>
          </div>
        )}
      </div></div>}
    </div>
  );
}
