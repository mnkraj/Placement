import { useState ,useEffect} from "react";
import Link from "next/link";
import { AiOutlineCaretDown } from "react-icons/ai";
import { VscDashboard, VscSignOut } from "react-icons/vsc";
import { useMediaQuery } from "react-responsive"; // For responsive behavior

export default function ProfileDropdown() {
  const [open, setOpen] = useState(false);
  const isMobile = useMediaQuery({ maxWidth: 768 }); // Mobile check
  const [user,setUser] = useState({
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
        const response = await fetch("https://placement-swart.vercel.app/auth/profile", {
          credentials: "include", 
        });
        const data = await response.json();
        if (data.success) {
          setUser(data.data); // Save user details
        } 
      } catch (error) {
        console.error("Error fetching user:", error);
        
      }
    }
    fetchUser();
    console.log(user)
  }, []);

  return (
    <div className="relative">
      {/* LAPTOP VIEW: Show profile image & dropdown */}
      {!isMobile ? (
        <>
          <button
            className="flex items-center gap-x-1 focus:outline-none"
            onClick={() => setOpen((prev) => !prev)}
            onBlur={() => setTimeout(() => setOpen(false), 150)} // Delayed to allow clicking inside
          >
            <img
              src={user.image}
              className="aspect-square w-[30px] rounded-full object-cover"
              alt="Profile"
            />
            <AiOutlineCaretDown className="text-sm text-richblack-100" />
          </button>

          {/* Dropdown Menu */}
          {open && (
            <div className="absolute top-full right-0 mt-2 w-40 rounded-md border border-gray-700 bg-richblack-800 shadow-lg">
              <Link href="/dashboard/my-profile">
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
                onClick={() => setOpen(false)}
              >
                <VscSignOut className="text-lg" />
                Logout
              </div>
            </div>
          )}
        </>
      ) : (
        // MOBILE VIEW: Show "Dashboard" & "Logout" directly
        <div className="flex flex-col gap-2 w-full text-white">
          <Link
            href="/dashboard/my-profile"
            className="flex items-center gap-x-2 px-4 py-2 text-sm hover:bg-gray-700"
          >
            <VscDashboard className="text-lg" />
            Dashboard
          </Link>
          <div
            className="flex items-center gap-x-2 px-4 py-2 text-sm hover:bg-gray-700 cursor-pointer"
          >
            <VscSignOut className="text-lg" />
            Logout
          </div>
        </div>
      )}
    </div>
  );
}
