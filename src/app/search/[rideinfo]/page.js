import getRideDetails from "@/lib/getRideDetails";
import React from "react";
import { CiClock1, CiLocationArrow1, CiLocationOn } from "react-icons/ci";
import { FaArrowDown, FaArrowRight, FaClock } from "react-icons/fa6";

export default async function page({ params: { rideinfo } }) {
  const data = await getRideDetails(rideinfo);

  return (
    <div className="flex flex-col font-dm font-bold">
      <div className="flex items-center justify-center gap-2 md:gap-6 p-2 md:p-8 flex-col md:flex-row">
        <div className="flex items-center gap-4 ">
          <CiLocationOn size={25} />
          <p>From: {data.start}</p>
        </div>
        <div>
          <FaArrowRight className="hidden md:block" />
          <FaArrowDown className="block md:hidden" />
        </div>
        <div className="flex items-center gap-4">
          <CiLocationArrow1 size={25} />
          <p>To: {data.end}</p>
        </div>
        <div className="flex items-center gap-4">
          <CiClock1 size={20} />
          <p>7:00 pm</p>
        </div>
      </div>
      <div className="flex justify-center items-center gap-2 flex-col">
        <div>
          <p>Owner Details:</p>
        </div>
        <div className="flex justify-center items-center gap-2 md:gap-5 flex-col md:flex-row">
          <p>Gender: {data.postedBy.gender}</p>
          <p>Vehicle Number: {data.postedBy.vehicleNumber}</p>
          <p>Vehical Type: {data.postedBy.vehicleType}</p>
        </div>
      </div>
      <div className="flex justify-center mt-4">
        <textarea
          className="w-[px] p-4 h-[50px] border-2 border-gray-500"
          placeholder="Any Comments?"
        />
      </div>
      <div className="flex justify-center mt-4">
        <button className="p-2 rounded-sm bg-green-400 text-white">
          Book Ride Now
        </button>
      </div>
    </div>
  );
}
