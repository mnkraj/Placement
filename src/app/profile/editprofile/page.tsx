"use client";

import React, { useState } from "react";
import "./styles.css"

const Page = () => {
  const [profileImage, setProfileImage] = useState(null);
  const [firstName, setFirstName] = useState("Mayank");
  const [lastName, setLastName] = useState("Raj");
  const [dateOfBirth, setDateOfBirth] = useState("");
  const [contactNumber, setContactNumber] = useState("");
  const [about, setAbout] = useState("");
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");

  return (
    <div className="h-[calc(100vh-3.5rem)] flex-1 overflow-auto">
      <div className="mx-auto w-11/12 max-w-[1000px] py-10">
        <h1 className="mb-14 text-3xl font-medium text-white">Edit Profile</h1>
        
        {/* Profile Image Section */}
        <div className="flex items-center justify-between rounded-md border border-gray-700 bg-gray-800 p-8 px-12 text-white">
          <div className="flex items-center gap-x-4">
            <img
              src={profileImage || "https://api.dicebear.com/5.x/initials/svg?seed=Mayank Raj"}
              alt="profile-Mayank"
              className="aspect-square w-[78px] rounded-full object-cover"
            />
            <div className="space-y-2">
              <p>Change Profile Picture</p>
              <div className="flex flex-row gap-3">
                <input
                  type="file"
                  id="profilePic"
                  className="hidden"
                  accept="image/png, image/gif, image/jpeg"
                  
                />
                <label htmlFor="profilePic" className="cursor-pointer rounded-md bg-gray-700 py-2 px-5 font-semibold text-white">
                  Select
                </label>
                <button className="flex items-center bg-yellow-50 cursor-pointer gap-x-2 rounded-md py-2 px-5 font-semibold text-gray-900">
                  Upload
                </button>
              </div>
            </div>
          </div>
        </div>
        
        {/* Profile Information Form */}
        <form className="my-10 rounded-md border border-gray-700 bg-gray-800 p-8 px-12">
          <h2 className="text-lg font-semibold text-white">Profile Information</h2>
          <div className="flex flex-col gap-5 lg:flex-row">
            <div className="flex flex-col gap-2 lg:w-[48%]">
              <label htmlFor="firstName">First Name</label>
              <input type="text" id="firstName" className="form-input" value={firstName} onChange={(e) => setFirstName(e.target.value)} />
            </div>
            <div className="flex flex-col gap-2 lg:w-[48%]">
              <label htmlFor="lastName">Last Name</label>
              <input type="text" id="lastName" className="form-input" value={lastName} onChange={(e) => setLastName(e.target.value)} />
            </div>
          </div>
          <div className="flex flex-col gap-5 lg:flex-row">
            <div className="flex flex-col gap-2 lg:w-[48%]">
              <label htmlFor="dateOfBirth">Date of Birth</label>
              <input type="date" id="dateOfBirth" className="form-input" value={dateOfBirth} onChange={(e) => setDateOfBirth(e.target.value)} />
            </div>
            <div className="flex flex-col gap-2 lg:w-[48%]">
              <label htmlFor="contactNumber">Contact Number</label>
              <input type="tel" id="contactNumber" className="form-input" value={contactNumber} onChange={(e) => setContactNumber(e.target.value)} />
            </div>
          </div>
          <div className="flex justify-end gap-2 mt-6">
            <button className="bg-gray-700 text-white py-2 px-5 rounded-md">Cancel</button>
            <button type="submit" className="bg-yellow-50 text-gray-900 py-2 px-5 rounded-md">Save</button>
          </div>
        </form>
        
        {/* Password Update Form */}
        <form className="my-10 rounded-md border border-gray-700 bg-gray-800 p-8 px-12">
          <h2 className="text-lg font-semibold text-white">Change Password</h2>
          <div className="flex flex-col gap-5 lg:flex-row">
            <div className="flex flex-col gap-2 lg:w-[48%]">
              <label htmlFor="oldPassword">Current Password</label>
              <input type="password" id="oldPassword" className="form-input" value={oldPassword} onChange={(e) => setOldPassword(e.target.value)} />
            </div>
            <div className="flex flex-col gap-2 lg:w-[48%]">
              <label htmlFor="newPassword">New Password</label>
              <input type="password" id="newPassword" className="form-input" value={newPassword} onChange={(e) => setNewPassword(e.target.value)} />
            </div>
          </div>
          <div className="flex justify-end gap-2 mt-6">
            <button className="bg-gray-700 text-white py-2 px-5 rounded-md">Cancel</button>
            <button type="submit" className="bg-yellow-50 text-gray-900 py-2 px-5 rounded-md">Update</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Page;
