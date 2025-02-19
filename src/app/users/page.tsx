"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import axios from "axios";
import Spinner from "../components/Spinner";
import Image from "next/image";

interface Users {
    _id: string;
    email: string;
    displayName: string;
    image: string;
}

const Page = () => {
    const [loading, setLoading] = useState(false);
    const [users, setUsers] = useState<Users[]>([]);

    const fetchUsers = async () => {
        setLoading(true);
        try {
            const response = await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_URL}/users/getallusers`);
            if (response.data.success) {
                setUsers(response.data.data);
            }
        } catch (error) {
            console.error("Error fetching users:", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchUsers();
    }, []);

    return (
        <div>
            {loading && (
                <div className="fixed inset-0 flex items-center justify-center bg-[rgb(0,8,20)] bg-opacity-40 z-50">
                    <Spinner />
                </div>
            )}
            {!loading && (
                <div className="w-full flex justify-center mt-12 md:mt-16">
                    <div className="py-8 px-4 mx-auto max-w-screen-xl lg:py-16 lg:px-6">
                        <div className="grid gap-8 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-3">
                            {users &&
                                users.map((user) => (
                                    <div
                                        key={user._id}
                                        className="w-80 h-auto  border  rounded-lg shadow-md bg-gray-800 border-gray-700 p-6 flex flex-col items-center"
                                    >
                                        <Image
                                            className="w-24 h-24 mb-3 rounded-full shadow-lg"
                                            src={
                                                user.image ||
                                                "https://res.cloudinary.com/dqw4vtcul/image/upload/v1739972310/blog/y7wcper0xlrrq3nqewac.png"
                                            }
                                            width={96}
                                            height={96}
                                            alt={user.displayName}
                                        />
                                        <h5 className="mb-1 text-lg font-medium text-white">
                                            {user.displayName}
                                        </h5>
                                        <span className="text-sm  font-semibold text-gray-400">
                                            {user.email.substring(0, 11).toUpperCase()}
                                        </span>
                                        <div className="mt-4">
                                            <Link
                                                href={`/users/${user.email.substring(0, 11).toUpperCase()}`}
                                                className="inline-flex items-center px-4 py-2 text-sm font-semibold text-black rounded-lg bg-yellow-50 hover:bg-yellow-100 focus:ring-4 focus:outline-none dark:focus:ring-blue-800"
                                            >
                                                Visit Profile
                                            </Link>
                                        </div>
                                    </div>
                                ))}
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Page;
