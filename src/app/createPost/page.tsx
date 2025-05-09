'use client'

import React, { useState, useEffect } from "react";
import TiptapEditor from "./Editor";
import Spinner from "../components/Spinner"
// import Parsehtml from "./Parsehtml";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import Link from "next/link";
import Image from "next/image";
import { Listbox, ListboxButton, ListboxOption, ListboxOptions } from '@headlessui/react'
import { ChevronUpDownIcon } from '@heroicons/react/16/solid'
// import { CheckIcon } from '@heroicons/react/20/solid'


export default function Page() {
  const [image, setImage] = useState<File | null>(null);
  const [head,sethead] = useState("")
  const [imagepreview, setimagepreview] = useState<string>("");
  const router = useRouter();
  const [title, setitle] = useState("")
  const [htmlContent, setHtmlContent] = useState("");
  const [companyoptions, setcompanyoptions] = useState<{ _id: string; name: string; logo: string }[]>([]);
  const [loading, setloading] = useState(false)
  const [selected, setSelected] = useState<{ _id: string; name: string; logo: string } | null>(null);
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImage(file);
      setimagepreview(URL.createObjectURL(file));

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
        // console.log(data)
        if (!data.success) {
          setloading(false)
          router.push("/")
          return;
          // Save user details
        }
        // setUser(data.data);
        setloading(false)
      } catch (error) {
        console.error("Error fetching user:", error);
        setloading(false)
      }
    }
    fetchUser();

    // console.log(user)
  }, [router]);

  useEffect(() => {
    async function fetchcomoanies() {
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/company/getallcomapnies`, {
        });
        const data = await response.json();
        if (data.success) setcompanyoptions(data.data)
      } catch {
      }
    }
    fetchcomoanies()

  }, [])
  const hanldepost = async () => {
    if (!title || !selected || !htmlContent  || !head) 
    {
      toast.error("All FieldsMandatory")
      return ;
    }
    setloading(true)
    const formData = new FormData();
    if(image) {formData.append("image" , image);}
    formData.append("title" , title)
    formData.append("company",selected._id)
    formData.append("html",htmlContent)
    formData.append("head",head);
    const l = toast.loading("Loading...")
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/auth/post`, {
        method: "POST",
        body: formData,
        credentials: "include",
      });
      const data = await response.json();
      setloading(false)
      setSelected(null)
      setHtmlContent("")
      setitle("")
      toast.dismiss(l)
      // console.log("Logout Response:", data); // Debugging
      if (!data.success) {
        toast.error(data.message)
        return;
      }
      toast.success(data.message)
      toast.success("ThankYou For Sharing Your Experience..", {
        icon: "🤗"
      })
      router.push("/")
    } catch (error) {
      console.error("Upload failed:", error);
      setloading(false)
    } finally {

    }
  }

  return (
    <div >
      {loading && (
        <div className="fixed inset-0 flex items-center justify-center text-white bg-[rgb(0,8,20)] bg-opacity-40 z-50">
          <Spinner />
        </div>
      )}
      {!loading && <div className="mx-auto w-11/12 max-w-[1000px] py-10 h-[120px]  mt-[30px] md:mt-[90px]">
        <h1 className=" text-3xl font-medium text-richblack-5">
          Create a new Post
        </h1>
        <h4 className="my-6 text-sm font-medium text-[#9198A1]">[#]Your new post will be visible to all users, ensuring maximum reach. Whether logged in or not, everyone will be able to see your update.</h4>
        <hr />
        <h5 className="my-6  mb-3 text-xs font-medium text-[#9198A1]" >Required fields are marked with an asterisk (*).</h5>
        <h4 className="mt-7 mb-3 text-xl font-medium text-richblack-5">Select the Comapny</h4>
        <Listbox value={selected} onChange={setSelected}>

          <div className="relative ">
            <ListboxButton className="grid w-1/2 md:w-[35%] cursor-default grid-cols-1 rounded-md border-[rgb(44,51,63)] bg-[#161D29] py-1.5 pr-2 pl-3 text-left text-gray-900 outline-1 -outline-offset-1 outline-gray-300 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6">
              {selected && <span className="col-start-1 row-start-1 flex items-center gap-3 pr-6">
                <Image alt="" height={90} width={90} src={selected.logo || "https://lh3.googleusercontent.com/a/ACg8ocIM97eXOLk9aAtoWnYR03eQyw6wLsxXARkOTjaNo8Uc1fERgSST=s96-c"} className="size-7 shrink-0 rounded-full" />
                <span className="mx-3 block truncate text-white">{selected.name}</span>
              </span>}
              <ChevronUpDownIcon
                aria-hidden="true"
                className="col-start-1 row-start-1 size-5 self-center justify-self-end text-gray-500 sm:size-4"
              />
            </ListboxButton>

            <ListboxOptions
              transition
              className="absolute z-10 mt-1 max-h-56 w-1/2 md:w-[35%] overflow-auto rounded-md bg-[rgb(0,8,20)] py-1 text-base ring-1 shadow-lg  focus:outline-hidden data-leave:transition data-leave:duration-100 data-leave:ease-in data-closed:data-leave:opacity-0 sm:text-sm"
            >
              {companyoptions && companyoptions.map((person) => (
                <ListboxOption
                  key={person._id}
                  value={person}
                  className="group relative cursor-default hover:bg-yellow-5 hover:text-black py-2 pr-9 pl-3 text-white select-none data-focus:bg-indigo-600 data-focus:text-white data-focus:outline-hidden"
                >
                  <div className="flex items-center ">
                    <Image alt="" height={90} width={90} src={person.logo || "https://lh3.googleusercontent.com/a/ACg8ocIM97eXOLk9aAtoWnYR03eQyw6wLsxXARkOTjaNo8Uc1fERgSST=s96-c"} className="size-5 shrink-0 rounded-full" />
                    <span className="ml-3 block truncate font-normal group-data-selected:font-semibold">{person.name}</span>
                  </div>

                  <span className="absolute inset-y-0 right-0 flex items-center pr-4 text-indigo-600 group-not-data-selected:hidden group-data-focus:text-white">

                  </span>
                </ListboxOption>
              ))}
            </ListboxOptions>
          </div>
        </Listbox>
        <h4 className=" mt-3 mb-6 text-xs font-medium text-[#9198A1]">You can Add a new company <Link href={"/profile/editprofile"}><span className="text-[#FFD60A]">here</span></Link> </h4>
        <hr />
        <h4 className="mt-6 mb-3 text-xs  font-medium text-[#9198A1]">Would you like to share details about the technologies you worked with and the tasks you undertook, or would you prefer to discuss the interview questions you encountered?</h4>
        <div className="flex flex-col md:flex-row mb-3">
          <select disabled={!selected} className={`form-input mt-3 mr-3 mb-3   ${selected ? "" : "cursor-not-allowed"} w-1/2 md:w-[35%] bg-[#161D29] border-[1 solid rgb(44,61,53)] rounded-md py-1.5 pr-2 pl-3 text-white `} value={title} onChange={(e) => setitle(e.target.value)} >
            <option value="" className="bg-[rgb(0,8,20)] " disabled>
              Select a title
            </option>
            <option value="Interview" className="bg-[rgb(0,8,20)]" >
              Interview Experience & Questions
            </option>
            <option value="Work" className="bg-[rgb(0,8,20)]" >
              Your Work - Tech Stack & Responsibilities
            </option>
          </select>
          <input type="text" className={`form-input text-white m-0 md:m-3  w-1/2 md:w-[35%] bg-[#161D29] border-[1 solid rgb(44,61,53)] rounded-md py-1.5 pr-2 pl-3  `} placeholder="Add A heading" value={head} onChange={(e)=> {sethead(e.target.value)}} disabled = {!selected} />
        </div>
        <hr />

        <div className="flex items-center  mt-3 justify-center w-full">
          {imagepreview ? (
            <div className="relative w-full h-64 border-2 border-gray-300 border-dashed rounded-lg overflow-hidden">
              <Image src={imagepreview || "https://lh3.googleusercontent.com/a/ACg8ocIM97eXOLk9aAtoWnYR03eQyw6wLsxXARkOTjaNo8Uc1fERgSST=s96-c"} width={1000} height={1000} alt="Preview" className="w-full h-full object-contain" />
              <button
                className="absolute top-2 right-2 bg-red-500 text-white p-1 rounded-full"
                onClick={() => {
                  setImage(null)
                  setimagepreview("")
                }}
              >
                ✕
              </button>
            </div>
          ) : (
            <label
              htmlFor="dropzone-file"
              className="flex flex-col items-center justify-center w-full h-64 border-2  border-dashed rounded-lg cursor-pointer bg-[rgb(0,8,20)] hover:bg-white/10  hover:bg-gray-100 border-gray-600 hover:border-gray-500 "
            >
              <div className="flex flex-col items-center justify-center pt-5 pb-6">
                <svg
                  className="w-8 h-8 mb-4 text-gray-400"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 20 16"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
                  />
                </svg>
                <p className="mb-2 text-sm text-gray-400">
                  <span className="font-semibold">Click to upload</span> or drag and drop
                </p>
                <p className="text-xs text-gray-400">
                  PNG, JPG or JPEG (MAX. 800x400px)
                </p>
              </div>
              <input id="dropzone-file" type="file" className="hidden" accept="image/png, image/jpeg" onChange={handleImageChange} />
            </label>
          )}
        </div>

        <div className="mt-3">
          <TiptapEditor setHtmlContent={setHtmlContent} />
        </div>
        <div className="mb-10 w-full flex justify-end">
          <button  onClick={hanldepost} className={`flex items-center bg-[#FFD60A] ${selected && title && htmlContent && head  ? "cursor-pointer" : "disabled cursor-not-allowed"}  gap-x-2 rounded-md py-2 px-5 font-semibold text-[#000814] undefined`}>Post</button>
        </div>
        {/* <Parsehtml content={htmlContent} /> */}
      </div>}
    </div>
  )
}
