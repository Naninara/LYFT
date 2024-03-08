"use client";
import React, { useState } from "react";
import { FaArrowRight, FaGithub, FaGoogle } from "react-icons/fa6";
import { signIn } from "next-auth/react";
import Link from "next/link";
import { toast } from "react-hot-toast";

export default function LoginForm({ url }) {
  const [inputData, setInputData] = useState(null);
  console.log(url);

  function handleChange(e) {
    setInputData((prevData) => ({
      ...prevData,
      [e.target.name]: e.target.value,
    }));
  }

  function SignInUsingCredentails(e) {
    e.preventDefault();

    if (!inputData?.email || !inputData?.password) {
      toast.error("Email and password must filled");
      return;
    }

    toast.promise(
      signIn("credentials", {
        ...inputData,
        callbackUrl: url.callbackUrl ? url.callbackUrl : "/",
      }),
      {
        success: "Logged In Succesfully",
        error: "invalid credentials",
        loading: "Loading....",
      }
    );
  }
  return (
    <form className="flex flex-col gap-4">
      <div>
        <p>Your email</p>
        <input
          type={"text"}
          className="w-full h-[40px] border-2 border-black rounded-lg px-3"
          placeholder="Enter Your Email"
          name="email"
          onChange={(e) => handleChange(e)}
        />
      </div>
      <div>
        <p>Your password</p>
        <input
          type={"text"}
          className="w-full h-[40px] border-2 border-black rounded-lg px-3"
          placeholder="Enter Your Password"
          name="password"
          onChange={(e) => handleChange(e)}
        />
      </div>

      <button
        className="w-full  h-[40px] rounded-sm  flex justify-center items-center gap-2 shadow-sm shadow-black"
        onClick={(e) => {
          e.preventDefault();
          try {
            signIn("google", { callbackUrl: "/publish", redirect: false });
          } catch (err) {
            console.log(err);
          }
        }}
      >
        <FaGoogle /> Continue With Google
      </button>

      <button
        className="w-full bg-black h-[40px] rounded-sm text-white flex justify-center items-center gap-2"
        onClick={(e) => {
          e.preventDefault();
          signIn("github", { callbackUrl: "/publish" });
        }}
      >
        <FaGithub /> Continue With Github
      </button>

      <div className="flex justify-end px-2 font-dm font-bold">
        <Link href={"/signup"} className="flex items-center gap-1">
          <p>SignUp</p>
          <FaArrowRight />
        </Link>
      </div>
      <button
        className="w-full bg-black h-[40px] rounded-sm text-white flex justify-center items-center gap-2"
        onClick={(e) => {
          SignInUsingCredentails(e);
        }}
      >
        {" "}
        Go Ahead <FaArrowRight />
      </button>
    </form>
  );
}
