"use client";
import axios from "axios";
import Link from "next/link";
import React from "react";
import { toast } from "react-hot-toast";
import { FaArrowDown, FaArrowRight } from "react-icons/fa6";

export default function SingleRequest({ data, _id, status }) {
  function approveRide() {
    toast.promise(
      axios.patch(`https://lyft-beta.vercel.app/api/booking?id=${_id}`),
      {
        loading: "Approving Ride",
        success: "Ride Approved",
        error: "Ride Already Approved",
      }
    );
  }

  return (
    <div className="flex flex-col md:flex-row gap-4 shadow-md p-[1%] font-bold font-dm ">
      <div className="flex flex-col md:flex-row justify-center items-center gap-4 md:gap-8 p-[1%]  ">
        <p className="flex"> RequestFrom:{data[0].name}</p>
        <p>Gender:{data[0].gender}</p>
        <p>email:{data[0].email}</p>
        {status == "Approved!!" ? <p>phone: {data[0].phonenumber}</p> : null}
        <p>Status:{status}</p>
      </div>

      <div className="flex justify-center gap-8">
        <button
          className="p-[1.5%] w-[125px] h-[50px] rounded-md bg-green-600 text-white font-medium"
          onClick={() => {
            approveRide();
          }}
        >
          Approve
        </button>
      </div>
    </div>
  );
}
