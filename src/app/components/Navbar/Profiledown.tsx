import { useState, useEffect } from "react";
import Link from "next/link";
import { AiOutlineCaretDown } from "react-icons/ai";
import { VscDashboard, VscSignOut } from "react-icons/vsc";
import { useRouter } from "next/navigation";
import Spinner from "../Spinner"
import { useMediaQuery } from "react-responsive"; // For responsive behavior
// import { setGlobal } from "next/dist/trace";

export default function ProfileDropdown() {
  const [loading, setloading] = useState(false)
  const router = useRouter()
  const [open, setOpen] = useState(false);
  const isMobile = useMediaQuery({ maxWidth: 768 }); // Mobile check
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
  });

  // Logout function
  const handlelogout = async () => {
    setloading(true)
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/auth/logout`, {
        credentials: "include",
        method: "GET",
      });

      if (!res.ok) {
        throw new Error(`Logout failed: ${res.status} ${res.statusText}`);
      }

      const data = await res.json();
      // console.log("Logout Response:", data); // Debugging

      if (!data.success) {
        return ;

      }
      setUser({
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
      });
      window.location.reload()
    } catch (error) {
      console.error("Error logging out:", error);
    } finally {
      setloading(false)
    }
  };

  useEffect(() => {
    async function fetchUser() {
      setloading(true)
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/auth/profile`, {
          credentials: "include",
        });
        const data = await response.json();
        console.log("User Data:", data);

        if (!data.success) {
          router.push("/")
        }
        setUser(data.data);
      } catch (error) {
        console.error("Error fetching user:", error);
      }
      finally {
        setloading(false)
      }
    }
    fetchUser();
  }, []);

  return (
    <div>
      {loading && (
        <div className="fixed inset-0 flex items-center justify-center bg-white bg-opacity-75 z-50">
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
