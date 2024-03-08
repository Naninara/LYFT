import { getServerSession } from "next-auth";
import React from "react";
import { options } from "../api/auth/[...nextauth]/options";

import LoginForm from "./Components/LoginForm";

export default async function page({ searchParams }) {
  const session = await getServerSession(options);
  return (
    <div className="flex justify-center items-center w-full h-[90vh] bg-[#F4F4FA] font-dm">
      <div className="flex flex-col gap-8 bg-white w-[320px] p-8 shadow-sm shadow-black rounded-md">
        <div className="flex flex-col items-center gap-3">
          <h1 className="text-3xl">Login To LYFT</h1>
          <p className="text-gray-400 text-sm">
            Sign In To Access Our Services
          </p>
        </div>
        <LoginForm url={searchParams} />
      </div>
    </div>
  );
}
