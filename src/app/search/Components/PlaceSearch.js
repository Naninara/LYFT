"use client";
import axios from "axios";
import React, { useState } from "react";
import GooglePlacesAutocomplete from "react-google-places-autocomplete";
import { toast } from "react-hot-toast";

import { CiLocationOn, CiLocationArrow1 } from "react-icons/ci";
import RideInfo from "./RideInfo";

export default function PlaceSearch() {
  const [start, setStart] = useState(null);
  const [end, setEnd] = useState(null);
  const [date, setDate] = useState(null);
  const [isLoading, setLoading] = useState(false);
  const [ridesData, setRidesData] = useState(null);

  function handleSearch() {
    if (!start || !end || !date) {
      toast.error("Select All Fields");
      return;
    }

    setLoading(true);

    axios
      .post("https://lyft-beta.vercel.app/api/search", {
        start: start.label,
        end: end.label,
        date,
      })
      .then((response) => {
        setRidesData(response.data);
        setLoading(false);
      })
      .catch((err) => {
        setLoading(false);
        console.log(err);
      });
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
              onChange: setStart,
              className: "w-full",
              placeholder: "From Where",
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
          className="w-auto border-gray-200 p-[1%] rounded-md border-2 h-[39px]"
          placeholder="dd/mm/yy"
          onChange={(e) => setDate(e.target.value)}
          min={new Date().toISOString().split("T")[0]}
        />
        <button
          className="h-[40px] w-[80px] bg-indigo-500 text-white rounded-[20px]"
          onClick={handleSearch}
        >
          Search
        </button>
      </div>
      <div className="flex flex-wrap justify-center gap-4">
        <RideInfo loading={isLoading} rideInfo={ridesData} />
      </div>
    </div>
  );
}
