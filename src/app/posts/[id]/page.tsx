"use client";
import React, { useState, useEffect } from "react";
import Spinner from "../../components/Spinner";
import axios from "axios";
import Link from "next/link";
import "./styles.css";
import { useParams } from "next/navigation";
// import toast from "react-hot-toast";
import Image from "next/image";

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
  const { id } = useParams();
  const [post, setPost] = useState<BlogPost | null>(null);
  const [loading, setLoading] = useState(true);

  const fetchPost = async () => {
    setLoading(true);
    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/posts/getpost`,
        { id }
      );
      if (response.data.success) {
        setPost(response.data.data);
      }
    } catch (error) {
      console.error("Error fetching blogs:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPost();
  }, []);

  return (
    <div>
      {loading && (
        <div className="fixed inset-0 flex items-center justify-center bg-[rgb(0,8,20)] bg-opacity-40 z-50">
          <Spinner />
        </div>
      )}
      {!loading && post && (
        <main className="pt-8 pb-16 lg:pt-16 lg:pb-24 bg-[rgb(0,8,20)] antialiased mt-[45px] md:mt-[85px]">
          <div className="flex justify-between px-4 mx-auto max-w-screen-xl">
            <article className="mx-auto w-full max-w-2xl md:max-w-4xl format format-sm sm:format-base lg:format-lg format-blue dark:format-invert">
              <header className="mb-4 lg:mb-6 not-format">
                <address className="flex justify-between items-center mb-6 not-italic">
                  <div className="flex items-center space-x-4">
                    <Image
                      className="w-16 h-16 rounded-full"
                      src={post.createdby.image}
                      width={64}
                      height={64}
                      alt={post.createdby.displayName}
                    />
                    <div>
                      <Link
                        href={`/users/${post.createdby.email.substring(0, 11).toUpperCase()}`}
                        rel="author"
                        className="text-xl font-bold hover:text-yellow-50 text-white"
                      >
                        {post.createdby.displayName}
                      
                      <br />
                      <span className="text-base text-gray-400">
                        {post.createdby.email.substring(0, 11).toUpperCase()}
                      </span>
                      </Link>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Image
                      className="w-12 h-12 rounded-md"
                      src={post.company.logo}
                      width={48}
                      height={48}
                      alt={post.company.name}
                    />
                    <span className="text-lg font-semibold text-white">{post.company.name}</span>
                  </div>
                </address>
                <h1 className="mb-4 text-3xl font-extrabold leading-tight lg:mb-6 lg:text-4xl text-white">
                  {post.heading}
                </h1>
                <hr />
              </header>

              <div className="flex justify-center mb-5 overflow-hidden">
                <figure className="w-full max-w-2xl overflow-hidden">
                  <Image
                    src={post.coverphoto}
                    alt="Blog Cover"
                    className="rounded-lg w-[800px] h-[400px] object-contain overflow-hidden"
                    width={1000}
                    height={1000}
                  />
                </figure>
              </div>
              <div dangerouslySetInnerHTML={{ __html: post.html }} className="" />
            </article>
          </div>
        </main>
      )}
    </div>
  );
};

export default Page;
