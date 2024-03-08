"use client";
import React, { useState } from "react";
import { FaArrowRight, FaCar, FaGithub, FaGoogle } from "react-icons/fa6";
import { signIn } from "next-auth/react";
import Link from "next/link";
import { FaBiking } from "react-icons/fa";
import { toast } from "react-hot-toast";
import axios from "axios";

export default function Signup() {
  const [signUpData, setSignUpData] = useState({});

  function handleSubmit() {
    if (
      !signUpData.email ||
      !signUpData.name ||
      !signUpData.newPassword ||
      !signUpData.password ||
      !signUpData.vehicleType ||
      !signUpData.gender ||
      !signUpData.vehicleNumber
    ) {
      toast.error("Every Field Must Filled");
      return;
    }
    if (signUpData.password !== signUpData.newPassword) {
      toast.error("Passwords Doesn't Match");
      return;
    }
    toast.promise(
      axios.post("http://localhost:3000/api/signup/credentials", {
        ...signUpData,
      }),
      {
        loading: "Signing You Up",
        success: (response) => `${response.data}`,
        error: (err) =>
          `${err.response ? err.response.data : "Server Not Responding"}`,
      }
    );
  }

  function handleChange(e) {
    setSignUpData((prevData) => ({
      ...prevData,
      [e.target.name]: e.target.value,
    }));
  }

  return (
    <div className="my-[30px]  md:my-0 flex-col md:flex-row flex gap-8 items-center   justify-center h-auto md:h-[87vh] w-full ">
      <div className="shadow-lg p-8 rounded-md">
        <div className="flex flex-col items-center gap-3 mb-4">
          <h1 className="text-3xl font-dm">Welcome To LYFT</h1>
          <p className="text-gray-400 text-sm font-dm">
            We Are Exicited To See You On Here
          </p>
        </div>
        <form
          className="flex flex-col gap-4 justify-between"
          onSubmit={(e) => {
            e.preventDefault();
            handleSubmit();
          }}
        >
          <div className="flex flex-col md:flex-row gap-2">
            <div>
              <p className="font-dm font-bold">Your email</p>
              <input
                type={"email"}
                className="w-full h-[40px] border-2 border-black rounded-lg px-3"
                placeholder="Enter Your Email"
                name="email"
                required
                onChange={(e) => {
                  handleChange(e);
                }}
              />
            </div>
            <div>
              <p className="font-dm font-bold">Enter Your Name</p>
              <input
                type={"text"}
                required
                className="w-full h-[40px] border-2 border-black rounded-lg px-3"
                placeholder="Enter Name"
                name="name"
                onChange={(e) => {
                  handleChange(e);
                }}
              />
            </div>
          </div>
          <div className="flex gap-2 flex-col md:flex-row">
            <div>
              <p className="font-dm font-bold">Your password</p>
              <input
                type={"password"}
                required
                className="w-full h-[40px] border-2 border-black rounded-lg px-3"
                placeholder="Enter Your Password"
                name="password"
                onChange={(e) => {
                  handleChange(e);
                }}
              />
            </div>
            <div>
              <p className="font-dm font-bold">Re-Enter password</p>
              <input
                type={"password"}
                required
                className="w-full h-[40px] border-2 border-black rounded-lg px-3"
                placeholder="Re-Enter Your Password"
                name="newPassword"
                onChange={(e) => {
                  handleChange(e);
                }}
              />
            </div>
          </div>
          <div className="flex gap-2 flex-col md:flex-row">
            <div>
              <p className="font-dm font-bold">Vehicle Type</p>
              <select
                type={"text"}
                required
                className="w-[243px] h-[40px] border-2 border-black rounded-lg px-3"
                placeholder="Enter Your Password"
                name="vehicleType"
                onChange={(e) => {
                  handleChange(e);
                }}
              >
                <option>select one</option>
                <option>Four Wheeler</option>
                <option>Two Wheeler</option>
              </select>
            </div>
            <div>
              <p className="font-dm font-bold"> Your Phone Number</p>
              <input
                type={"number"}
                required
                className="w-full h-[40px] border-2 border-black rounded-lg px-3"
                placeholder="Enter Your Phone Number"
                name="phonenumber"
                onChange={(e) => {
                  handleChange(e);
                }}
              />
            </div>
          </div>
          <div className="flex gap-2 flex-col md:flex-row">
            <p className="font-dm font-bold">Gender:</p>
            <div className="flex">
              <input
                type={"radio"}
                required
                className="w-full  border-2 border-black rounded-lg px-3"
                name="gender"
                value={"female"}
                onChange={(e) => {
                  handleChange(e);
                }}
              />

              <label className="ml-2">Male</label>
              <input
                type={"radio"}
                required
                className="w-full border-2 border-black rounded-lg px-3 ml-2"
                name="gender"
                value={"male"}
                onChange={(e) => {
                  handleChange(e);
                }}
              />

              <label className="ml-2">Female</label>
              <input
                type={"radio"}
                required
                className="w-full  border-2 border-black rounded-lg px-3 ml-2"
                name="gender"
                value={"other"}
                onChange={(e) => {
                  handleChange(e);
                }}
              />
              <label className="ml-2">Other</label>
            </div>
          </div>

          <div>
            <p className="font-dm font-bold">Enter Vehicle Number</p>
            <input
              type={"text"}
              required
              className="w-full h-[40px] border-2 border-black rounded-lg px-3"
              placeholder="Enter Vehicle Number"
              name="vehicleNumber"
              onChange={(e) => {
                handleChange(e);
              }}
            />
          </div>

          <div className="w-full items-center flex justify-between">
            <p className="font-dm font-bold">Already SignedUp?</p>
            <Link href={"/signin"} className="flex items-center gap-1">
              <p className="font-dm font-bold">SignIn</p>
              <FaArrowRight />
            </Link>
          </div>
          <div className="w-full mt-4">
            <button
              type="submit"
              className="w-full bg-black h-[40px] rounded-sm text-white flex justify-center items-center gap-2"
            >
              {" "}
              Go Ahead <FaArrowRight />
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
