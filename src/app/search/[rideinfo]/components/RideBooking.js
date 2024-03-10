"use client";
import Loading from "@/app/Components/Loading";
import axios from "axios";
import { useSession } from "next-auth/react";
import { redirect } from "next/dist/server/api-utils";
import React, { useState } from "react";
import { toast } from "react-hot-toast";

export default function RideBooking({ postedEmail, RideId }) {
  const { data, status } = useSession({
    required: true,
    onUnauthenticated() {
      redirect("/signin?callbackurl=/profile");
    },
  });

  async function BookRide() {
    toast.loading("Checking Details", { duration: 1000 });

    const personaldetails = await axios.get(
      `https://lyft-beta.vercel.app/api/personaldetails?email=${data.user.email}`
    );

    if (!personaldetails.data) {
      toast.error(
        "Your details not aviliable with us! Please Update in profile section to book Ride"
      );
      return;
    }

    toast.success("verified your details");

    toast
      .promise(
        axios.post("https://lyft-beta.vercel.app/api/booking", {
          postedEmail,
          RideId,
          userEmail: data.user.email,
        }),
        {
          success: "Booking Confirmed!!",
          loading: "Booking A Ride",
          error: (err) => `${err.response.data}`,
        }
      )

      .then((response) => {
        console.log(response.data);
      })
      .catch((err) => console.log(err));
  }

  if (status == "loading") {
    return <Loading />;
  }

  return (
    <>
      <div className="flex justify-center mt-4">
        <textarea
          className="w-[px] p-4 h-[50px] border-2 border-gray-500"
          placeholder="Any Comments?"
          onChange={(e) => {
            setComments(e.target.value);
          }}
        />
      </div>
      <div className="flex justify-center mt-4">
        <button
          className="p-2 rounded-sm bg-green-400 text-white"
          onClick={BookRide}
        >
          Book Ride Now
        </button>
      </div>
    </>
  );
}
