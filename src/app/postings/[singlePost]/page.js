import { getBookings } from "@/lib/getBookings";
import React from "react";
import Ride from "../components/Ride";
import SingleRequest from "./Components/SingleRequest";

export default async function page({ params: { singlePost } }) {
  const data = await getBookings(singlePost);

  if (!data || data.length == 0) {
    return (
      <div className="flex w-full justify-center items-center font-dm font-bold">
        <p>No Booking Found!!</p>
      </div>
    );
  }

  return (
    <div className="flex justify-center flex-wrap gap-4 mt-2">
      {data.map((ele) => {
        return <SingleRequest {...ele} key={ele._id} />;
      })}
    </div>
  );
}
