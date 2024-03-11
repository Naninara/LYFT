import getBookingsByEmail from "@/lib/getPersonalBookings";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import React from "react";
import { options } from "../api/auth/[...nextauth]/options";
import BookingItem from "./Components/BookingItem";

export default async function page() {
  const session = await getServerSession(options);

  if (!session) {
    redirect("/signin");
  }
  const data = await getBookingsByEmail(session.user.email);

  if (data?.length === 0) {
    return (
      <div className="flex justify-center items-center font-bold w-full font-dm">
        <p>No Bookings Found!!</p>
      </div>
    );
  }
  return (
    <div className="px-4 md:px-0 rounded-sm flex flex-wrap items-center justify-center gap-4">
      {data.map((ele) => {
        return <BookingItem {...ele} key={ele._id} />;
      })}
    </div>
  );
}
