"use client";
import React, { useEffect, useState } from "react";
import { CiLocationArrow1, CiLocationOn } from "react-icons/ci";
import GooglePlacesAutocomplete from "react-google-places-autocomplete";
import { FaMale } from "react-icons/fa";
import { FaArrowRight, FaCar } from "react-icons/fa6";
import Link from "next/link";
import { redirect } from "next/navigation";
import { useSession } from "next-auth/react";
import { toast } from "react-hot-toast";
import axios from "axios";

export default function PublishComponent() {
  const [start, setStart] = useState(null);
  const [end, setEnd] = useState(null);
  const [date, setDate] = useState(null);
  const [fair, setFair] = useState(null);
  const { data, status } = useSession({
    required: true,
    onUnauthenticated() {
      redirect("/signin?callbackurl=/publish");
    },
  });

  function PostRide() {
    if (!start || !end || !date || !fair || !data.user.email) {
      toast.error("All details must be filled");
      return;
    }
    toast.promise(
      axios.post("http://localhost:3000/api/ride", {
        start: start.label,
        end: end.label,
        date,
        rideAmount: fair,
        postedEmail: data.user.email,
      }),
      {
        loading: "Posting Your Ride",
        success: (response) => `${response.data}`,
        error: (err) =>
          `${
            err.response.status == 409
              ? "Cool!! Ride Already Posted"
              : "Something went wrong"
          }`,
      }
    );
  }

  return status == "loading" ? (
    <div className="flex w-full h-[80vh] justify-center items-center animate-ping">
      <svg
        width="60"
        height="60"
        viewBox="0 0 32 32"
        aria-hidden="true"
        focusable="false"
        data-testid="core-ui-icon-lyft"
      >
        <path d="M12.816 11.368h3.813v8.559c0 1.595-.555 2.92-1.596 3.826-.933.812-2.23 1.258-3.65 1.258-.906 0-1.826-.19-2.677-.528v-3.38c.121.068.23.122.23.122.567.27 1.176.42 1.784.42.595 0 1.109-.136 1.514-.393.433-.27.69-.662.744-1.122a3.187 3.187 0 0 1-2.055.757 3.182 3.182 0 0 1-3.177-3.177v-6.342h3.812v5.07c0 .488.555.853 1.069.488a.482.482 0 0 0 .202-.406v-5.152h-.013ZM6.8 17.71c0 1.027.324 1.933.946 2.623.04.04.135.148.135.148s-.108.068-.162.095a3.276 3.276 0 0 1-1.393.311C4.717 20.887 3 19.697 3 17.074V7.556h3.8V17.71Zm20.929-2.529v.636c0 .69.554 1.27 1.27 1.27v3.814h-.161c-1.312-.041-2.542-.555-3.448-1.46-.947-.947-1.46-2.232-1.46-3.61v-3.489c0-.92-.987-1.623-1.974-1.082a1.141 1.141 0 0 0-.568.987v1.041h1.582v3.786h-1.582a3.78 3.78 0 0 1-1.068 2.637 3.732 3.732 0 0 1-2.583 1.162h-.148v-8.64c0-1.879 1.433-3.988 3.19-4.637 3.164-1.176 6.301.784 6.869 3.772H29v3.813h-1.271Z"></path>
      </svg>
    </div>
  ) : (
    <div className="flex flex-col font-dm">
      <div className="p-[2%] pt-5 flex flex-col md:flex-row md:p-[2%] w-full items-center justify-center gap-4 ">
        <div className="flex items-center gap-2 w-full md:w-[400px]">
          <CiLocationOn size={25} />

          <GooglePlacesAutocomplete
            apiKey={process.env.NEXT_PUBLIC_GOOGLE_API_KEY}
            debounce={1000}
            selectProps={{
              start,
              className: "w-full",
              placeholder: "From Where",
              onChange: setStart,
            }}
          />
        </div>
        <div className="flex items-center gap-2 w-full md:w-[400px]">
          <CiLocationArrow1 size={25} />
          <GooglePlacesAutocomplete
            apiKey={process.env.NEXT_PUBLIC_GOOGLE_API_KEY}
            debounce={1000}
            selectProps={{
              end,
              onChange: setEnd,
              className: "w-full",
              placeholder: "Where to..",
            }}
          />
        </div>
        <input
          type={"date"}
          className="w-auto border-gray-200 p-[1%] rounded-md border-2 h-[39px] w-[250px]"
          placeholder="On When"
          onChange={(e) => {
            setDate(e.target.value);
          }}
        />
      </div>
      <div className="flex-col md:flex-row flex w-full items-center justify-center gap-9">
        <p>
          By <b>Mavin Nara</b>
        </p>
        <p className="flex items-center">
          Gender:<b> Male</b> <FaMale size={20} />
        </p>
        <p className="flex items-center gap-3">
          Vehicle Number: <b>AP05-CQ-1234</b> <FaCar size={20} />
        </p>
        <Link href={"/personal"}>
          <button className="flex items-center gap-2">
            Update Details <FaArrowRight />
          </button>
        </Link>
      </div>
      <div className="flex justify-center gap-3 p-4 mt-4">
        <p className="hidden md:block">Enter Your Fare Amount</p>
        <input
          type={"number"}
          className="border-b w-auto border-gray-500 "
          placeholder="₹ Enter Amount "
          onChange={(e) => {
            setFair(e.target.value);
          }}
        />
      </div>
      <div className="flex justify-center text-white ">
        <button
          className="p-4 bg-indigo-500 w-[150px] rounded-md"
          onClick={PostRide}
        >
          Publish Ride
        </button>
      </div>
    </div>
  );
}
