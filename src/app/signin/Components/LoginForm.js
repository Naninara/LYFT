"use client";
import React from "react";
import { FaArrowRight, FaGithub, FaGoogle } from "react-icons/fa6";
import { signIn } from "next-auth/react";
import Link from "next/link";

export default function LoginForm() {
  return (
    <form className="flex flex-col gap-4">
      <div>
        <p>Your email</p>
        <input
          type={"text"}
          className="w-full h-[40px] border-2 border-black rounded-lg px-3"
          placeholder="Enter Your Email"
        />
      </div>
      <div>
        <p>Your password</p>
        <input
          type={"text"}
          className="w-full h-[40px] border-2 border-black rounded-lg px-3"
          placeholder="Enter Your Password"
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
      <button className="w-full bg-black h-[40px] rounded-sm text-white flex justify-center items-center gap-2">
        {" "}
        Go Ahead <FaArrowRight />
      </button>
    </form>
  );
}
