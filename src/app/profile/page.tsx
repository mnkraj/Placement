"use client";
import React, { useState, useEffect } from "react";
import Spinner from "../components/Spinner"
import { useRouter } from "next/navigation"; // Import useRouter
import Image from "next/image";



const Page = () => {
  const branch = {
    "CS": "Computer Science",
    "EE": "Electrical Engineering",
    "ECE": "Electronic & Comm. Engg.",
    "MM": "Metallurgy Engg.",
    "PI": "Production Engg.",
    "ME": "Mechanical Engg.",
    "CE": "Civil Engg.",
    "CM": "Computational Mechanics"
  }
  const router = useRouter();
  const [loading, setloading] = useState(false)
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
      setloading(true)
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/auth/profile`, {
          credentials: "include",
        });
        const data = await response.json();
        // console.log(data)
        if (!data.success) {
          setloading(false)
          router.push("/")
          return;
          // Save user details
        }
        setUser(data.data);
        setloading(false)
      } catch (error) {
        console.error("Error fetching user:", error);

      }
    }
    fetchUser();

    // console.log(user)
  }, [router]);
  const handlenavigateEditprofile = () => {
    router.push("/profile/editprofile")
  }
  return (
    <div>
      {loading && (
        <div className="fixed inset-0 flex items-center justify-center bg-[rgb(0,8,20)] bg-opacity-40 z-50">
          <Spinner />
        </div>
      )}
      {!loading && <div className="mx-auto w-11/12 max-w-[1000px] py-10 mt-[30px] md:mt-[90px]">
        <h1 className="mb-14 text-3xl font-medium text-richblack-5">
          My Profile
        </h1>
        <div className="flex items-center justify-between rounded-md border-[1px] border-[rgb(44,51,63)] bg-[#161D29] md:p-8 p-[15px] ">
          <div className="flex items-center gap-x-4">
            <Image
              width={90}
              height={90}
              src={user.image || "https://lh3.googleusercontent.com/a/ACg8ocIM97eXOLk9aAtoWnYR03eQyw6wLsxXARkOTjaNo8Uc1fERgSST=s96-c"}
              alt="profile-Mayank"
              className="aspect-square w-[78px] rounded-full object-cover"
            />
            <div className="space-y-1">
              <p className="text-lg font-semibold text-richblack-5">
                {user.displayName}
              </p>
              <p className="text-lg text-[#838894]">
                {user.email.substring(0, 11).toUpperCase()}
              </p>
            </div>
          </div>
          <button onClick={handlenavigateEditprofile} className="flex items-center bg-[#FFD60A] cursor-pointer gap-x-2 rounded-md py-2 px-5 font-semibold text-[#000814] undefined">
            <span className="false">Edit</span>
            <svg
              stroke="currentColor"
              fill="currentColor"
              stroke-width="0"
              viewBox="0 0 24 24"
              height="1em"
              width="1em"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M16.7574 2.99666L14.7574 4.99666H5V18.9967H19V9.2393L21 7.2393V19.9967C21 20.5489 20.5523 20.9967 20 20.9967H4C3.44772 20.9967 3 20.5489 3 19.9967V3.99666C3 3.44438 3.44772 2.99666 4 2.99666H16.7574ZM20.4853 2.09717L21.8995 3.51138L12.7071 12.7038L11.2954 12.7062L11.2929 11.2896L20.4853 2.09717Z"></path>
            </svg>
          </button>
        </div>
        <div className="my-10 flex flex-col gap-y-10 rounded-md border-[1px] border-[rgb(44,51,63)] bg-[#161D29] md:p-8 p-[15px] ">
          <div className="flex w-full items-center justify-between">
            <p className="text-lg font-semibold text-richblack-5">Profesional Expereince</p>
            <button onClick={handlenavigateEditprofile} className="flex items-center bg-[#FFD60A] cursor-pointer gap-x-2 rounded-md py-2 px-5 font-semibold text-[#000814] undefined">
              <span className="false">Edit</span>
              <svg
                stroke="currentColor"
                fill="currentColor"
                stroke-width="0"
                viewBox="0 0 24 24"
                height="1em"
                width="1em"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M16.7574 2.99666L14.7574 4.99666H5V18.9967H19V9.2393L21 7.2393V19.9967C21 20.5489 20.5523 20.9967 20 20.9967H4C3.44772 20.9967 3 20.5489 3 19.9967V3.99666C3 3.44438 3.44772 2.99666 4 2.99666H16.7574ZM20.4853 2.09717L21.8995 3.51138L12.7071 12.7038L11.2954 12.7062L11.2929 11.2896L20.4853 2.09717Z"></path>
              </svg>
            </button>
          </div>
          <p className="text-[#6E727F] text-sm font-medium">
            Write Something About Yourself
          </p>
        </div>
        <div className="my-10 flex flex-col gap-y-10 rounded-md border-[1px] border-[rgb(44,51,63)] bg-[#161D29] md:p-8 p-[15px] ">
          <div className="flex w-full items-center justify-between">
            <p className="text-lg font-semibold text-richblack-5">
              Personal Details
            </p>

          </div>
          <div className="flex max-w-[500px] justify-between  ">
            <div className="flex flex-col gap-y-5">
              <div>
                <p className="mb-2 text-sm text-[#424854]">Name</p>
                <p className="text-sm font-medium text-richblack-5">{user.displayName}</p>
              </div>
              <div>
                <p className="mb-2 text-sm text-[#424854]">Batch</p>
                <p className="text-sm font-medium text-richblack-5">
                  {user.email.substring(0, 4)}
                </p>
              </div>

            </div>
            <div className="flex flex-col gap-y-5">
              <div>
                <p className="mb-2 text-sm text-[#424854]">Branch</p>
                <p className="text-sm font-medium text-richblack-5">{branch[user.email.substring(6, 8).toUpperCase() as keyof typeof branch] || "Unknown"}</p>
              </div>
              <div>
                <p className="mb-2 text-sm text-[#424854]">Intitute Id</p>
                <p className="text-sm font-medium text-richblack-5">
                  {user.email.substring(0, 11).toUpperCase()}
                </p>
              </div>

            </div>
          </div>
        </div>
      </div>}
    </div>
  );
};

export default Page;
