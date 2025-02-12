import React from "react";

const page = () => {
  return (
    <div>
      <div className="mx-auto w-11/12 max-w-[1000px] py-10">
        <h1 className="mb-14 text-3xl font-medium text-richblack-5">
          My Profile
        </h1>
        <div className="flex items-center justify-between rounded-md border-[1px] border-[rgb(44,51,63)] bg-[#161D29] p-8 px-12">
          <div className="flex items-center gap-x-4">
            <img
              src="https://api.dicebear.com/5.x/initials/svg?seed=Mayank Raj"
              alt="profile-Mayank"
              className="aspect-square w-[78px] rounded-full object-cover"
            />
            <div className="space-y-1">
              <p className="text-lg font-semibold text-richblack-5">
                Mayank Raj
              </p>
              <p className="text-sm text-[#838894]">
                2022ugcs042@nitjsr.ac.in
              </p>
            </div>
          </div>
          <button className="flex items-center bg-[#FFD60A] cursor-pointer gap-x-2 rounded-md py-2 px-5 font-semibold text-[#000814] undefined">
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
        <div className="my-10 flex flex-col gap-y-10 rounded-md border-[1px] border-[rgb(44,51,63)] bg-[#161D29] p-8 px-12">
          <div className="flex w-full items-center justify-between">
            <p className="text-lg font-semibold text-richblack-5">About</p>
            <button className="flex items-center bg-[#FFD60A] cursor-pointer gap-x-2 rounded-md py-2 px-5 font-semibold text-[#000814] undefined">
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
        <div className="my-10 flex flex-col gap-y-10 rounded-md border-[1px] border-[rgb(44,51,63)] bg-[#161D29] p-8 px-12">
          <div className="flex w-full items-center justify-between">
            <p className="text-lg font-semibold text-richblack-5">
              Personal Details
            </p>
            <button className="flex items-center bg-[#FFD60A] cursor-pointer gap-x-2 rounded-md py-2 px-5 font-semibold text-[#000814] undefined">
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
          <div className="flex max-w-[500px] justify-between">
            <div className="flex flex-col gap-y-5">
              <div>
                <p className="mb-2 text-sm text-[#424854]">First Name</p>
                <p className="text-sm font-medium text-richblack-5">Mayank</p>
              </div>
              <div>
                <p className="mb-2 text-sm text-[#424854]">Email</p>
                <p className="text-sm font-medium text-richblack-5">
                  2022ugcs042@nitjsr.ac.in
                </p>
              </div>
              <div>
                <p className="mb-2 text-sm text-[#424854]">Gender</p>
                <p className="text-sm font-medium text-richblack-5">
                  Add Gender
                </p>
              </div>
            </div>
            <div className="flex flex-col gap-y-5">
              <div>
                <p className="mb-2 text-sm text-[#424854]">Last Name</p>
                <p className="text-sm font-medium text-richblack-5">Raj</p>
              </div>
              <div>
                <p className="mb-2 text-sm text-[#424854]">Phone Number</p>
                <p className="text-sm font-medium text-richblack-5">
                  Add Contact Number
                </p>
              </div>
              <div>
                <p className="mb-2 text-sm text-[#424854]">Date Of Birth</p>
                <p className="text-sm font-medium text-richblack-5">
                  January 1, 1970
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default page;
