"use client";
import axios from "axios";
import { signOut, useSession } from "next-auth/react";
import { redirect } from "next/navigation";
import React, { useEffect, useState } from "react";
import { FaSignOutAlt } from "react-icons/fa";
import { FaArrowRight, FaHand } from "react-icons/fa6";
import Loading from "../Components/Loading";
import { PiHandWavingThin } from "react-icons/pi";
import { toast } from "react-hot-toast";

export default function Profilepage(params) {
  const [personalData, setPersonalData] = useState(null);
  const [loading, setLoading] = useState(false);
  const { data, status } = useSession({
    required: true,
    onUnauthenticated() {
      redirect("/signin?callbackurl=/profile");
    },
  });
  useEffect(() => {
    if (data) {
      setLoading(true);
      axios
        .get(
          `https://lyft-beta.vercel.app/api/personaldetails?email=${data.user.email}`
        )
        .then((response) => setPersonalData(response.data))
        .catch((err) => console.log(err))
        .finally(() => setLoading(false));
    }
  }, [data]);

  if (status == "loading" || loading) {
    return <Loading />;
  }

  function handleChange(e) {
    setPersonalData((prevData) => ({
      ...prevData,
      [e.target.name]: e.target.value,
    }));
    console.log(personalData);
  }

  function handleSubmit() {
    if (
      !personalData?.phonenumber ||
      !personalData?.vehicleType ||
      !personalData?.gender ||
      !personalData?.vehicleNumber ||
      !personalData?.name
    ) {
      toast.error("All Fields Must Be filled");
      return;
    }

    toast
      .promise(
        axios.post("https://lyft-beta.vercel.app//api/personaldetails", {
          ...personalData,
          email: data.user.email,
        }),
        {
          loading: "Updating Data",
          success: "Updated Sucessfully",
          error: "Something Wrong",
        }
      )

      .then((response) => {
        setPersonalData(response.data);
      })
      .catch((err) => console.log(err));
  }

  return (
    <div>
      <div className="my-[30px]  md:my-0 flex-col md:flex-row flex items-center   justify-center h-auto md:h-[87vh] w-full ">
        <div className="shadow-lg p-8 rounded-md gap-4 flex flex-col">
          <div className="flex justify-center flex-col items-center ">
            <h1 className="font-dm text-2xl font-bold flex items-center justify-center gap-2">
              Hello {data.user.name} <PiHandWavingThin />
            </h1>
            <p className="text-gray-500 font-bold">Glad to see you here</p>
          </div>
          <div className="flex justify-between font-dm font-bold">
            <div className="flex">
              <p className="text-sm text-red-600">Fill NA If Not Applicable*</p>
            </div>
            <button
              onClick={() => {
                signOut();
              }}
              className="flex items-center gap-2"
            >
              Sign out <FaSignOutAlt />
            </button>
          </div>
          <div className="flex gap-2 flex-col md:flex-row">
            <div>
              <p className="font-dm font-bold"> Your Phone Number</p>
              <input
                type={"number"}
                required
                className="w-full h-[40px] border-2 border-black rounded-lg px-3"
                placeholder="Enter Your Phone Number"
                name="phonenumber"
                value={personalData?.phonenumber}
                onChange={(e) => {
                  handleChange(e);
                }}
              />
            </div>
            <div>
              <p className="font-dm font-bold">Enter Your Name</p>
              <input
                type={"text"}
                required
                className="w-full h-[40px] border-2 border-black rounded-lg px-3"
                name="name"
                value={personalData?.name}
                onChange={(e) => {
                  handleChange(e);
                }}
                placeholder="Enter Your Name"
              />
            </div>
          </div>
          <div className="flex gap-2 flex-col md:flex-row">
            <p className="font-dm font-bold">Gender:</p>
            <div className="flex">
              <input
                type={"radio"}
                required
                className="w-full  border-2 border-black rounded-lg px-3"
                name="gender"
                value={"male"}
                onChange={(e) => {
                  handleChange(e);
                }}
              />

              <label className="ml-2">Male</label>
              <input
                type={"radio"}
                required
                className="w-full border-2 border-black rounded-lg px-3 ml-2"
                name="gender"
                value={"female"}
                onChange={(e) => {
                  handleChange(e);
                }}
              />

              <label className="ml-2">Female</label>
              <input
                type={"radio"}
                required
                className="w-full  border-2 border-black rounded-lg px-3 ml-2"
                name="gender"
                value={"other"}
                onChange={(e) => {
                  handleChange(e);
                }}
              />
              <label className="ml-2">Other</label>
            </div>
          </div>
          <div className="flex gap-2 flex-col md:flex-row">
            <div>
              <p className="font-dm font-bold">Enter Vehicle Number</p>
              <input
                type={"text"}
                required
                value={personalData?.vehicleNumber}
                className="w-full h-[40px] border-2 border-black rounded-lg px-3"
                placeholder="Enter Vehicle Number"
                name="vehicleNumber"
                onChange={(e) => {
                  handleChange(e);
                }}
              />
            </div>
            <div>
              <p className="font-dm font-bold">Vehicle Type</p>
              <select
                type={"text"}
                required
                className="w-[288px] md:w-[243px] h-[40px] border-2 border-black rounded-lg px-3"
                placeholder="Enter Your Password"
                name="vehicleType"
                value={personalData?.vehicleType}
                onChange={(e) => {
                  handleChange(e);
                }}
              >
                <option>select one</option>
                <option>NA</option>
                <option>Four Wheeler</option>
                <option>Two Wheeler</option>
              </select>
            </div>
          </div>
          <div className="w-full mt-4">
            <button
              type="submit"
              className="w-full bg-black h-[40px] rounded-sm text-white flex justify-center items-center gap-2"
              onClick={() => {
                handleSubmit();
              }}
            >
              Go Ahead <FaArrowRight />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
