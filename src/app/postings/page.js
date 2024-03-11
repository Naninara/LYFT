import GetPostings from "@/lib/postings";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import React from "react";
import { options } from "../api/auth/[...nextauth]/options";
import Ride from "./components/Ride";

export default async function page() {
  const session = await getServerSession(options);
  if (!session) {
    redirect("/signin?callbackurl=/postings");
  }
  const data = await GetPostings(session.user.email);

  if (data.length == 0) {
    return (
      <div className="flex justify-center items-center font-dm font-bold">
        <p>No Rides Published</p>
      </div>
    );
  }
  return (
    <div className="px-4 md:px-0 rounded-sm flex flex-wrap items-center justify-center gap-4">
      {data.map((ele) => {
        return <Ride {...ele} key={ele._id} />;
      })}
    </div>
  );
}
