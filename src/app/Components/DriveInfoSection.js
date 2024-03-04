import Image from "next/image";
import React from "react";
import { FaMoneyBillTrendUp } from "react-icons/fa6";
import { IoIosTimer } from "react-icons/io";

export default function DriveInfoSection() {
  return (
    <div className="flex-col md:flex-row flex md:p-[4%] w-full bg-[#F4F4FA] py-8 gap-4">
      <div className=" px-4 w-full md:w-1/2 flex flex-col gap-4 justify-center md:px-16">
        <h2 className="text-[16px] font-dm font-bold border-b-2 border-black">
          Drive With LYFT
        </h2>
        <h1 className="text-[25px] md:text-[36px] font-dm font-bold">
          Set your own hours. Earn on your own terms.
        </h1>
        <div className="text-[16px] font-dm font-bold">
          <p className="flex gap-2 items-center">
            <FaMoneyBillTrendUp />
            Reliable earnings:
          </p>
          <p>Make money, keep your tips, and cash out when you want.</p>
        </div>

        <div className="text-[16px] font-dm font-bold">
          <p className="flex gap-2 items-center">
            <IoIosTimer />A flexible schedule:
          </p>
          <p>Be your own boss and drive whenever it works for you</p>
        </div>
      </div>
      <div className="px-4 w-full md:w-1/2 flex flex-col gap-4 justify-center md:px-16">
        <h2 className="text-[16px] font-dm font-bold border-b-2 border-black">
          SAFETY FIRST
        </h2>
        <h1 className="text-[25px] md:text-[36px] font-dm font-bold">
          Your safety comes first. Always.
        </h1>
        <div className="text-[16px] font-dm ">
          <p>
            We look out for you before, during, and after every single ride. And
            we check in with you during your ride to help you get where you need
            to go. If you ever need it, we’re standing by, ready to help.
          </p>
        </div>
      </div>
    </div>
  );
}
