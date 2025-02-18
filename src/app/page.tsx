"use client";
import Image from "next/image";
import Spinner from "./components/Spinner"
import Link from "next/link";
import { useEffect, useState } from "react";
import axios from "axios";

// Define the TypeScript interface for a blog post
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
  const [loading, setloading] = useState(false);
  const [blogs, setBlogs] = useState<BlogPost[]>([]);

  // Fetch blogs from API
  const fetchBlogs = async () => {
    setloading(true)
    try {
      const response = await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_URL}/posts/getallposts`);
      if (response.data.success) {
        setBlogs(response.data.data);
      }
    } catch (error) {
      console.error("Error fetching blogs:", error);
    }finally{
      setloading(false)
    }
  };

  useEffect(() => {
    fetchBlogs();
  }, []);

  return (
    <div>
      {loading && (
        <div className="fixed inset-0 flex items-center justify-center bg-[rgb(0,8,20)] bg-opacity-40 z-50">
          <Spinner />
        </div>
      )}
      {!loading && <div className="w-full flex justify-center mt-[45px] md:mt-[60px]">
      <section className="bg-[rgb(0,8,20)] ">
        <div className="py-8 px-4 mx-auto max-w-screen-xl lg:py-16 lg:px-6">
          <div className="grid gap-8 lg:grid-cols-2 xl:grid-cols-3">
            {blogs.map((blog) => (
              <article
                key={blog._id}
                className="p-4  rounded-lg border shadow-md bg-gray-800 border-gray-700 w-[330px] md:w-[350px] h-[460px] flex flex-col"
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
                      <Image src={blog.company.logo ||"https://res.cloudinary.com/dqw4vtcul/image/upload/v1739644903/company_logos/o7gi9c47vjzz7c6mgnye.png"} height={90} width={90} alt="" className="aspect-square rounded-full object-cover w-[30px]" />
                      <p className="text-white font-semibold " >{blog.company.name ||""}</p>
                    </div>
              </div>
                {/* Content */}
                <div className="flex-grow flex flex-col p-2">
                  <h2 className="text-lg font-extrabold text-white">{"#" +  blog.heading}</h2>

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
                    <Link href={`/users/${blog.createdby.email.substring(0,11).toLocaleUpperCase()}`}>
                    <div className="flex gap-2 justify-center items-center">
                      <Image src={blog.createdby.image ||"https://res.cloudinary.com/dqw4vtcul/image/upload/v1739779818/profile_pictures/s5mmnhtbyftis7wp7ywu.jpg"} height={90} width={90} alt="" className="aspect-square rounded-full object-cover w-[30px]" />
                      <div className="text-white hover:text-yellow-50">
                      <p className=" text-sm mb-0" >{blog.createdby.displayName || ""}</p>
                      {/* <small >{blog.createdby.email.substring(0,11).toLocaleUpperCase() || ""}</small> */}
                      </div>
                    </div>
                    </Link>
                    <a
                      href="#"
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
                    </a>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>
    </div>}
    </div>
  );
};

export default Page;
