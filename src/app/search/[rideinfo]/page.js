import { options } from "@/app/api/auth/[...nextauth]/options";
import getRideDetails from "@/lib/getRideDetails";
import { getServerSession } from "next-auth";
import React from "react";
import { CiClock1, CiLocationArrow1, CiLocationOn } from "react-icons/ci";
import { FaArrowDown, FaArrowRight, FaClock } from "react-icons/fa6";
import RideBooking from "./components/RideBooking";

export default async function page({ params: { rideinfo } }) {
  const data = await getRideDetails(rideinfo);

  const session = await getServerSession(options);

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
          <p>{data.time}</p>
        </div>
      </div>
      <div className="flex justify-center items-center gap-2 flex-col">
        <div>
          <p>Owner Details:</p>
        </div>
        <div className="flex justify-center items-center gap-2 md:gap-5 flex-col md:flex-row">
          <p>Name: {data.postedBy.name}</p>
          <p>Gender: {data.postedBy.gender}</p>
          <p>Vehicle Number: {data.postedBy.vehicleNumber}</p>
          <p>Vehical Type: {data.postedBy.vehicleType}</p>
        </div>
      </div>
      <RideBooking {...data} RideId={rideinfo} />
    </div>
  );
}
