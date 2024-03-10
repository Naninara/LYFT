import React from "react";
import { FaArrowDown, FaArrowRight } from "react-icons/fa6";

export default function BookingItem({
  ridedetails: { start, end, time, date },
  status,
  owner,
}) {
  return (
    <div className="flex flex-col gap-4 shadow-md p-[1%] font-bold font-dm ">
      <div className="flex flex-col md:flex-row justify-center items-center gap-4 md:gap-8 p-[1%] ">
        <p>From: {start}</p>
        <FaArrowRight className="hidden md:block" />
        <FaArrowDown className="block md:hidden" />
        <p>To: {end}</p>
      </div>
      <div className="flex justify-center gap-8">
        <p>By {owner.name}</p>
        <p>
          On {date} | {time}
        </p>
        <p>Status: {status}</p>
      </div>
    </div>
  );
}
