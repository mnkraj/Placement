"use client";
import { useRouter } from "next/navigation";
import Spinner from "../../components/Spinner"
import React, { useState, useEffect } from "react";
import Image from "next/image";
import "./styles.css"

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
  const [company, setcompany] = useState("")
  const [companyoptions, setcompanyoptions] = useState<{ _id: string; name: string; logo: string }[]>([]);;
  const handleCompanyUpload = async () => {
    if (!selectedCompanyLogo) return alert("Please select a company logo");
    setloading(true);
    const formData = new FormData();
    formData.append("Logo", selectedCompanyLogo);
    formData.append("name", comapanyname);

    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/auth/add-company`, {
        method: "POST",
        body: formData,
        credentials: "include",
      });
      await response.json();
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
      console.log("Upload Success:", data);
    } catch (error) {
      console.error("Upload failed:", error);
    } finally {
      setloading(false)
    }
  };
  const hanldesave = async()=>{
    if(!company) return ;
    setloading(true)
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/auth/addprofessionalexperience`, {
        method: "POST",
        body: JSON.stringify({ id: company }),
        headers: {
          "Content-Type": "application/json",  // Add this header
        },
        credentials: "include",
      });
      const data = await response.json();
      if(!data.success)
      {
        console.log(data)
      }
      setloading(false)
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
      {!loading && <div className="h-[calc(100vh-3.5rem)] flex-1 overflow-auto mt-[30px] md:mt-[90px]">
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

              <div className="flex flex-col gap-2 lg:w-[48%]">
                <h2 className="text-lg font-semibold  text-white ">Professional Experience</h2>
                <div className="flex justify-around gap-4">
                  <div className="w-[50px]">
                  {company && <Image
                    src={companyoptions.find((e) => e._id === company)?.logo || "https://lh3.googleusercontent.com/a/ACg8ocIM97eXOLk9aAtoWnYR03eQyw6wLsxXARkOTjaNo8Uc1fERgSST=s96-c"}
                    alt="profile-Mayank"
                    width={90}
                    height={90}
                    className="aspect-square w-[50px] rounded-full object-cover"
                  />}
                  </div>
                  <select className="form-input w-[75%] " value={company} onChange={(e) => setcompany(e.target.value)} >
                    <option value="" disabled>
                      Select a company
                    </option>
                    {companyoptions.map((option) => (
                      <option key={option._id} value={option._id}>
                        {option.name}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="flex flex-col gap-2 lg:w-[48%]">
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
              <button className="bg-yellow-50 text-gray-900 py-2 px-5 rounded-md"  onClick={hanldesave} >Save</button>
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
