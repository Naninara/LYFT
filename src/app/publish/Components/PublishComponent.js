"use client";
import React, { useEffect, useState } from "react";
import { CiLocationArrow1, CiLocationOn } from "react-icons/ci";
import GooglePlacesAutocomplete from "react-google-places-autocomplete";
import { FaFemale, FaMale } from "react-icons/fa";
import { FaArrowRight, FaCar, FaMotorcycle } from "react-icons/fa6";
import Link from "next/link";
import { redirect } from "next/navigation";
import { useSession } from "next-auth/react";
import { toast } from "react-hot-toast";
import axios from "axios";
import Loading from "@/app/Components/Loading";

export default function PublishComponent() {
  const [start, setStart] = useState(null);
  const [end, setEnd] = useState(null);
  const [date, setDate] = useState(null);
  const [fair, setFair] = useState(null);
  const [loading, setLoading] = useState(null);
  const [time, setTime] = useState(null);

  const [personalDetails, setPersonalDetails] = useState({});

  //getting logged in session data from NextAuth
  const { data, status } = useSession({
    required: true,
    onUnauthenticated() {
      redirect("/signin");
    },
  });

  //Function to Publish A Ride Into Public
  function PostRide() {
    if (!start || !end || !date || !fair || !data.user.email || !time) {
      toast.error("All details must be filled");
      return;
    }
    toast.promise(
      axios.post("http://localhost:3000/api/ride", {
        start: start.label,
        end: end.label,
        date,
        time,
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

  useEffect(() => {
    setLoading(true);
    if (data) {
      axios
        .get(
          `http://localhost:3000/api/personaldetails?email=${data.user.email}`
        )
        .then((response) => {
          setPersonalDetails(response.data);
        })
        .catch((err) => console.log(err))
        .finally(() => {
          setLoading(false);
        });
    }
  }, [data]);

  if (status == "loading" || loading) {
    return <Loading />;
  }

  if (!personalDetails) {
    return (
      <div className="flex w-full items-center justify-center flex-col font-dm h-[30vh] p-8 gap-4 text-pretty">
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
            onChange={(e) => {
              setDate(e.target.value);
            }}
            min={new Date().toISOString().split("T")[0]}
          />
          <input
            type={"text"}
            className="w-auto  border-gray-200 p-[1%] rounded-md border-2 h-[39px] w-[250px]"
            placeholder="On When XX:YY am/pm"
          />
        </div>
        <p className=" font-extrabold text-xl">
          Looks Like We Dont Have Personal details Please Update Your Details To
          Post Rides
        </p>
        <Link
          href={"/profile"}
          className="flex items-center gap-2 text-lg text-green-500"
        >
          <p>Update Here</p>
          <FaArrowRight />
        </Link>
      </div>
    );
  }

  return (
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
          onChange={(e) => {
            setDate(e.target.value);
          }}
          min={new Date().toISOString().split("T")[0]}
        />
        <input
          type={"text"}
          className="w-auto  border-gray-200 p-[1%] rounded-md border-2 h-[39px] w-[250px]"
          placeholder="On When XX:YY am/pm"
          onChange={(e) => {
            setTime(e.target.value);
          }}
        />
      </div>
      <div className="flex-col md:flex-row flex w-full items-center justify-center gap-9">
        <p>
          By <b>{personalDetails.name}</b>
        </p>

        <p className="flex items-center">
          Gender:
          {personalDetails.gender === "male" ? (
            <>
              <b> Male</b> <FaMale size={20} />
            </>
          ) : (
            <>
              <b> Female</b> <FaFemale size={20} />
            </>
          )}
        </p>
        <p className="flex items-center gap-3">
          Vehicle Number:
          {personalDetails.vehicleType == "Two Wheeler" ? (
            <>
              {personalDetails.vehicleNumber} <FaMotorcycle />
            </>
          ) : (
            <>
              {personalDetails.vehicleNumber} <FaCar />
            </>
          )}
        </p>
        <Link href={"/profile"}>
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
