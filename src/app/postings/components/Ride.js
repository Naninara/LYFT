import Link from "next/link";
import React from "react";
import { FaArrowDown, FaArrowRight } from "react-icons/fa6";

export default function Ride({ _id, start, end, date, bookings }) {
  return (
    <div className="flex flex-col gap-4 shadow-md p-[1%] font-bold font-dm ">
      <div className="flex flex-col md:flex-row justify-center items-center gap-4 md:gap-8 p-[1%] ">
        <p>From: {start}</p>
        <FaArrowRight className="hidden md:block" />
        <FaArrowDown className="block md:hidden" />
        <p>To: {end}</p>
      </div>
      <div className="flex justify-center gap-8">
        <p>On: {date}</p>
        <p>Bookings: {bookings?.length}</p>
      </div>
      <div className="flex justify-center gap-8">
        <Link href={`/postings/${_id}`}>
          <button className="p-[1.5%] w-[125px] h-[50px] rounded-md bg-green-600 text-white font-medium">
            View More
          </button>
        </Link>
      </div>
    </div>
  );
}
