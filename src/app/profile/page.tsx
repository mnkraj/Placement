"use client";
import React, { useState, useEffect } from "react";
// import axios from "axios";
import Link from "next/link";
import Spinner from "../components/Spinner";
import { useRouter } from "next/navigation"; // Import useRouter
import Image from "next/image";
interface Company {
  _id: string;
  name: string;
  logo: string;
  createdby: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
}
interface BlogPost {
  _id: string;
  company: {
    _id: string;
    name: string;
    logo: string;
  };
  title: string;
  heading: string;
  coverphoto: string;
  html: string;
  createdby: {
    _id: string;
    email: string;
    displayName: string;
    image: string;
  };
  createdAt: string;
  updatedAt: string;
}

const Page = () => {
  const [blogs, setBlogs] = useState<BlogPost[]>([]);
  const branch = {
    CS: "Computer Science And Engineering",
    EE: "Electrical Engineering",
    ECE: "Electronic & Comm. Engg.",
    MM: "Metallurgy Engg.",
    PI: "Production Engg.",
    ME: "Mechanical Engg.",
    CE: "Civil Engg.",
    CM: "Computational Mechanics",
  };
  const router = useRouter();
  const [companies, setCompanies] = useState<Company[]>([]);
  const [loading, setloading] = useState(false);
  const [user, setUser] = useState({
    _id: "",
    googleId: "",
    email: "",
    displayName: "",
    firstName: "",
    lastName: "",
    image: "",
    createdAt: "",
    updatedAt: "",
    linurl: "",
    __v: 0,
  });
  useEffect(() => {
    async function fetchUser() {
      setloading(true);
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_BACKEND_URL}/auth/profile`,
          {
            credentials: "include",
          }
        );
        const data = await response.json();
        // console.log(data)
        if (!data.success) {
          setloading(false);
          router.push("/");
          return;
          // Save user details
        }
        setUser(data.data);
        setCompanies(data.companies)
        setBlogs(data.posts)
        setloading(false);
      } catch (error) {
        console.error("Error fetching user:", error);
      }
    }
    fetchUser();

    // console.log(user)
  }, [router]);
  const handlenavigateEditprofile = () => {
    router.push("/profile/editprofile");
  };
  return (
    <div>
      {loading && (
        <div className="fixed inset-0 flex items-center justify-center bg-[rgb(0,8,20)] bg-opacity-40 z-50">
          <Spinner />
        </div>
      )}
      {!loading && (
        <section className=" py-8 antialiased bg-[rgb(0,8,20)]  md:py-8 mt-[30px] md:mt-[90px]">
          <div className="mx-auto max-w-screen-lg px-4 2xl:px-0">
            <h2 className="mb-4 text-2xl font-semibold text-white sm:text-2xl md:mb-6">
              My Profile
            </h2>

            <div className="py-4 md:py-8">
              <div className="mb-4 grid gap-4 sm:grid-cols-2 sm:gap-8 lg:gap-16">
                <div className="space-y-4">
                  <div className="flex space-x-4">
                    <Image
                      className="h-16 w-16 rounded-lg"
                      height={90}
                      width={90}
                      src={user.image || "https://lh3.googleusercontent.com/a/ACg8ocIM97eXOLk9aAtoWnYR03eQyw6wLsxXARkOTjaNo8Uc1fERgSST=s96-c"}
                      alt="Helene avatar"
                    />
                    <div>
                      <span className="mb-2 inline-block rounded bg-yellow-25 px-2.5 py-0.5 text-xs font-semibold text-black">
                        {" "}
                        Student{" "}
                      </span>
                      <h2 className="flex items-center text-xl font-bold leading-none text-white sm:text-2xl">
                        {user.displayName}
                      </h2>
                    </div>
                  </div>
                  <dl className="">
                    <dt className="font-semibold text-white">
                      Email Address
                    </dt>
                    <dd className="text-gray-400">
                      {user.email}
                    </dd>
                  </dl>
                  <dl>
                    <dt className="font-semibold text-white">
                      Branch
                    </dt>
                    <dd className="flex items-center gap-1 text-gray-400">

                      {branch[user.email.substring(6, 8).toUpperCase() as keyof typeof branch] || "Unknown"}
                    </dd>
                  </dl>

                </div>
                <div className="space-y-4">
                  <dl>
                    <dt className="font-semibold text-white">
                      LinkedIn Profile
                    </dt>
                    <dd className="text-gray-400">
                    {user.linurl ? <Link href={user.linurl} className="hover:text-yellow-50">{user.linurl}</Link> : "No Linked Url"}
                    </dd>
                  </dl>
                  <dl>
                    <dt className="font-semibold text-white">
                      Batch
                    </dt>
                    <dd className="flex items-center gap-1 text-gray-400">
                      {user.email.substring(0, 4)} - {parseInt(user.email.substring(0, 4)) + 4}
                    </dd>
                  </dl>
                  <dl>
                    <dt className="mb-1 font-semibold text-white">
                      Professional Expereince
                    </dt>
                    <dd className="flex items-center space-x-4 text-gray-400">
                      {companies.length > 0? companies.map((e) => {
                        return (<Image
                          key={e._id}
                          width={90}
                          height={90}
                          className="w-[50px]  flex"
                          src={e.logo || "https://lh3.googleusercontent.com/a/ACg8ocIM97eXOLk9aAtoWnYR03eQyw6wLsxXARkOTjaNo8Uc1fERgSST=s96-c"}
                          alt=""
                        />
                        )
                      }) : <p className="mt-3">No Expereince Added</p>}

                    </dd>
                  </dl>
                </div>
              </div>
              <button onClick={handlenavigateEditprofile}
                type="button"
                data-modal-target="accountInformationModal2"
                data-modal-toggle="accountInformationModal2"
                className="inline-flex w-full items-center justify-center rounded-lg bg-yellow-50 px-5 py-2.5 text-sm font-medium text-black  focus:outline-none focus:ring-4    sm:w-auto"
              >
                <svg
                  className="-ms-0.5 me-1.5 h-4 w-4"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke="currentColor"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="m14.304 4.844 2.852 2.852M7 7H4a1 1 0 0 0-1 1v10a1 1 0 0 0 1 1h11a1 1 0 0 0 1-1v-4.5m2.409-9.91a2.017 2.017 0 0 1 0 2.853l-6.844 6.844L8 14l.713-3.565 6.844-6.844a2.015 2.015 0 0 1 2.852 0Z"
                  ></path>
                </svg>
                Edit your data
              </button>
            </div>
            <hr />
            <h1 className="text-2xl sm:text-2xl font-semibold mt-5 mb-5 text-gray-400" >My Posts</h1>
            <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 place-items-center mx-auto gap-3">
              {blogs.map((blog) => (
                <article
                  key={blog._id}
                  className="p-4  rounded-lg border  shadow-md bg-gray-800 border-gray-700 w-[330px] md:w-[330px] h-[460px] flex flex-col"
                >
                  {/* Image - Occupying 50% of Card Height */}
                  <div className="h-[50%] w-full relative  overflow-hidden">
                    <Image
                      src={blog.coverphoto}
                      width={1500}
                      height={1500}
                      alt={blog.heading}
                      className="object-cover h-full overflow-hidden w-full rounded-lg"
                    />
                  </div>
                  <div className="flex justify-between mt-3 items-center mb-5 text-gray-500">
                    <span className=" text-black font-semibold text-xs  inline-flex items-center px-2.5 py-0.5 rounded bg-yellow-50 ">

                      {blog.title == "Work" ? "Work Expereince" : "Interview"}
                    </span>
                    <div className="flex gap-1 justify-center items-center">
                      <Image src={blog.company.logo || "https://res.cloudinary.com/dqw4vtcul/image/upload/v1739644903/company_logos/o7gi9c47vjzz7c6mgnye.png"} height={90} width={90} alt="" className="aspect-square rounded-full object-cover w-[30px]" />
                      <p className="text-white font-semibold " >{blog.company.name || ""}</p>
                    </div>
                  </div>
                  {/* Content */}
                  <div className="flex-grow flex flex-col p-2">
                    <h2 className="text-lg font-extrabold text-white">{"#" + blog.heading}</h2>

                    {/* Render HTML content and truncate if needed */}
                    <div
                      className="mt-2 mb-2 text-white overflow-hidden line-clamp-3"
                      dangerouslySetInnerHTML={{
                        __html: blog.html.length > 150
                          ? blog.html.substring(0, 150) + "..."
                          : blog.html,
                      }}
                    />

                    {/* Read More Link */}
                    <div className="mt-auto  flex justify-between  hover:cursor-pointer">
                      <Link href={`/users/${blog.createdby.email.substring(0, 11).toLocaleUpperCase()}`}>
                        <div className="flex gap-2 justify-center items-center">
                          <Image src={blog.createdby.image || "https://res.cloudinary.com/dqw4vtcul/image/upload/v1739779818/profile_pictures/s5mmnhtbyftis7wp7ywu.jpg"} height={90} width={90} alt="" className="aspect-square rounded-full object-cover w-[30px]" />
                          <div className="text-white hover:text-yellow-50">
                            <p className=" text-sm mb-0" >{blog.createdby.displayName || ""}</p>
                            {/* <small >{blog.createdby.email.substring(0,11).toLocaleUpperCase() || ""}</small> */}
                          </div>
                        </div>
                      </Link>
                      <Link 
                        href={`/posts/${blog._id}`}
                        className="inline-flex items-center font-medium text-[#FFD60A] hover:underline"
                      >
                        Read more
                        <svg
                          className="ml-2 w-4 h-4"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            fillRule="evenodd"
                            d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
                            clipRule="evenodd"
                          ></path>
                        </svg>
                      </Link>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>
          {/* <!-- Account Information Modal --> */}

        </section>
      )}
    </div>
  );
};

export default Page;
