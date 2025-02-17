"use client";
import { useRouter } from "next/navigation";
import Spinner from "../../components/Spinner"
import React, { useState, useEffect } from "react";
import toast from "react-hot-toast";
import Image from "next/image";
import "./styles.css"
import { Listbox, ListboxButton, ListboxOption, ListboxOptions } from '@headlessui/react'
import { ChevronUpDownIcon } from '@heroicons/react/16/solid'

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
  // const [profileImage, setProfileImage] = useState(null);
  const router = useRouter();
  const [loading, setloading] = useState(false)
  const [comapanyname, setcompanyname] = useState("")
  const [selectedCompanyLogo, setSelectedCompanyLogo] = useState<File | null>(null);
  const [companyLogoPreview, setCompanyLogoPreview] = useState<string>("");
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const handleCompanyLogoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedCompanyLogo(file);
      setCompanyLogoPreview(URL.createObjectURL(file));

    }
  };
  const handlereset = () => {
    setSelectedCompanyLogo(null)
    setCompanyLogoPreview("")
    setcompanyname("")
  }
  // const [companyid, setcompanyid] = useState("")
  const [selected, setSelected] = useState<{ _id: string; name: string; logo: string } | null>(null);
  const [lin, setlin] = useState("")
  const [companyoptions, setcompanyoptions] = useState<{ _id: string; name: string; logo: string }[]>([]);
  const handleCompanyUpload = async () => {
    if (!selectedCompanyLogo) return alert("Please select a company logo");
    setloading(true);
    const l = toast.loading("Loading...")
    const formData = new FormData();
    formData.append("Logo", selectedCompanyLogo);
    formData.append("name", comapanyname);

    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/auth/add-company`, {
        method: "POST",
        body: formData,
        credentials: "include",
      });
      const data = await response.json();
      setloading(false)
      toast.dismiss(l)
      // console.log("Logout Response:", data); // Debugging
      if (!data.success) {
        toast.error(data.message)
        return;
      }
      toast.success(data.message)
    } catch (error) {
      console.error("Company logo upload failed:", error);
    } finally {
      setloading(false);
      handlereset()
    }
  };
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
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]; // Ensure file exists

    if (file) {
      setSelectedFile(file);
      setUser((prev) => ({ ...prev, image: URL.createObjectURL(file) })); // Use 'file' directly
    }
  };

  const handleUpload = async () => {
    if (!selectedFile) return alert("Please select a file");
    setloading(true)
    const l = toast.loading("Loading...")
    const formData = new FormData();
    formData.append("image", selectedFile);
    // 'image' must match backend key

    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/auth/upload-profile-pic`, {
        method: "POST",
        body: formData,
        credentials: "include",
      });

      const data = await response.json();
      setloading(false)
      toast.dismiss(l)
      // console.log("Logout Response:", data); // Debugging
      if (!data.success) {
        toast.error(data.message)
        return;
      }
      toast.success(data.message)
    } catch (error) {
      console.error("Upload failed:", error);
    } finally {
      setloading(false)
    }
  };
  const hanldesave = async () => {
    if (!selected && !lin) return;
    const body = {id : "" , linurl : ""};
    if (selected) body.id = selected._id;
    const isValidURL = (str: string): boolean => {
      try {
        new URL(str); // Throws an error if invalid
        return true;
      } catch {
        return false;
      }
    };
    
    if (lin && isValidURL(lin)) {
      body.linurl = lin;
    } else if (lin) {
      toast.error("Invalid URL format!");
      return;
    }
    setloading(true)
    const l = toast.loading("Loading...")
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/auth/addprofessionalexperience`, {
        method: "POST",
        body: JSON.stringify(body),
        headers: {
          "Content-Type": "application/json",  // Add this header
        },
        credentials: "include",
      });
      const data = await response.json();
      setloading(false)
      setSelected(null)
      toast.dismiss(l)
      // console.log("Logout Response:", data); // Debugging
      if (!data.success) {
        toast.error(data.message)
        return;
      }
      toast.success(data.message)
    } catch (error) {
      console.error("Upload failed:", error);
      setloading(false)
    } finally {

    }
  }

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
          router.push("/")
          setloading(false)
          return;
          // Save user details
        }
        setUser(data.data);
        setloading(false)
      } catch (error) {
        setloading(false)
        console.error("Error fetching user:", error);

      }
    }

    fetchUser();

    // console.log(user)
  }, [router]);

  return (
    <div>
      {loading && (
        <div className="fixed inset-0 flex items-center justify-center bg-[rgb(0,8,20)] bg-opacity-75 z-50">
          <Spinner />
        </div>
      )}
      {!loading && <div className="h-[calc(100vh-3.5rem)] flex-1  mt-[30px] md:mt-[90px]">
        <div className="mx-auto w-11/12 max-w-[1000px] py-10">
          <h1 className="mb-14 text-3xl font-medium text-white">Edit Profile</h1>

          {/* Profile Image Section */}
          <div className="flex items-center justify-between rounded-md border border-gray-700 bg-gray-800 p-8 px-12 text-white">
            <div className="flex items-center gap-x-4">
              <Image
                src={user.image || "https://lh3.googleusercontent.com/a/ACg8ocIM97eXOLk9aAtoWnYR03eQyw6wLsxXARkOTjaNo8Uc1fERgSST=s96-c"}
                alt="profile-Mayank"
                width={90}
                height={90}
                className="aspect-square w-[78px] rounded-full object-cover"
              />
              <div className="space-y-2">
                <p>Change Profile Picture</p>
                <div className="flex flex-row gap-3">
                  <input
                    type="file"
                    id="profilePic"
                    className="hidden"
                    onChange={handleFileChange}
                    accept="image/png, image/gif, image/jpeg"

                  />
                  <label htmlFor="profilePic" className="cursor-pointer rounded-md bg-gray-700 py-2 px-5 font-semibold text-white">
                    Select
                  </label>
                  <button onClick={handleUpload} className="flex items-center bg-yellow-50 cursor-pointer gap-x-2 rounded-md py-2 px-5 font-semibold text-gray-900">
                    Upload
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Profile Information Form */}
          <div className="my-10 rounded-md border border-gray-700 bg-gray-800 p-8 px-12">

            <div className="flex flex-col gap-5 lg:flex-row">

              <div className="flex flex-col gap-2 w-full md:w-[48%]">
                <h2 className="text-lg font-semibold  text-white "> Add a Company to Your Experience</h2>
                <div className="w-full">
                  <Listbox value={selected} onChange={setSelected} >
                    <div className="relative ">
                      <ListboxButton className="grid w-full  cursor-default grid-cols-1 rounded-md border-[rgb(44,51,63)] bg-[#161D29] py-1.5 pr-2 pl-3 text-left text-gray-900 outline-1 -outline-offset-1 outline-gray-300 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6">
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
                        className="absolute z-10 mt-1 w-full max-h-56 overflow-auto rounded-md bg-[rgb(0,8,20)] py-1 text-base ring-1 shadow-lg  focus:outline-hidden data-leave:transition data-leave:duration-100 data-leave:ease-in data-closed:data-leave:opacity-0 sm:text-sm"
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
                </div>
                <div className="">
                  <input type="url" value={lin} onChange={(e) => setlin(e.target.value)} className="form-input w-full" placeholder="Enter Your LinkedIn URL" />
                </div>
              </div>

              <div className="flex flex-col gap-2 md:w-[48%]">
                <h2 className="text-lg font-semibold text-white">Add a Comapny to the database</h2>

                <div className="flex gap-3 flex-col md:flex-row " >

                  {companyLogoPreview ? (<Image
                    src={companyLogoPreview || "https://lh3.googleusercontent.com/a/ACg8ocIM97eXOLk9aAtoWnYR03eQyw6wLsxXARkOTjaNo8Uc1fERgSST=s96-c"}
                    alt="profile-Mayank"
                    width={90}
                    height={90}
                    className="aspect-square w-[50px] rounded-full object-cover"
                  />) : (<label htmlFor="companyprofilePic" className="bg-[#2C333F] rounded-md items-center text-center text-sm  cursor-pointer md:w-[20%] w-full  font-semibold text-white  p-1"><input
                    type="file"
                    id="companyprofilePic"
                    className="hidden"
                    onChange={handleCompanyLogoChange}
                    accept="image/png, image/gif, image/jpeg"

                  />
                    Choose Logo
                  </label>)}
                  <input type="text" placeholder="Company name" id="CompanyName" className="form-input md:w-[40%] w-full " value={comapanyname} onChange={(e) => setcompanyname(e.target.value)} />
                  <button className="bg-[#2C333F] text-white py-2 px-5 rounded-md md:w-[20%] w-full" onClick={handlereset} >Reset </button>
                  <button className={`bg-yellow-50 text-gray-900 py-2 px-5 rounded-md  md:w-[20%] w-full ${companyLogoPreview && comapanyname ? "" : "opacity-50 cursor-not-allowed bg-yellow-25"} `} onClick={handleCompanyUpload} >Upload </button>
                </div>
              </div>
            </div>

            <div className="flex justify-end gap-2 mt-6">
              <button className="bg-gray-700 text-white py-2 px-5 rounded-md">Cancel</button>
              <button className="bg-yellow-50 text-gray-900 py-2 px-5 rounded-md" onClick={hanldesave} >Save</button>
            </div>
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

        </div>
      </div>}
    </div>
  );
};

export default Page;
