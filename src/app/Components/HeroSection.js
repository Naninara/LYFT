import Image from "next/image";
import React from "react";

export default function HeroSection() {
  return (
    <div className="py-[30px] md:py-0 h-auto flex-col-reverse  md:flex-row md:h-[70vh] flex justify-start items-center w-full  ">
      <div className="w-full md:w-1/2 flex justify-center items-center p-[6%]">
        <Image
          src={
            "https://res.cloudinary.com/dggryzgok/image/upload/v1709532050/LYFT/wbsedzgboczrxikkf1d5.webp"
          }
          unoptimized={true}
          className="w-full h-auto object-cover"
          width={300}
          height={300}
          alt="Hero Section"
        />
      </div>
      <div className=" items-center md:items-start md:w-1/2 flex flex-col gap-4 ">
        <h1 className="text-4xl md:text-6xl font-dm font-bold">
          Sharing Is Caring..
        </h1>
        <div className="w-full flex gap-4">
          <button className=" w-[150px] h-[60px] border-2 border-black bg-indigo-600 rounded-[48px] text-white hover:bg-white hover:text-black ">
            Book A Drive
          </button>
          <button className="w-[150px] h-[60px]  rounded-[48px] text-black border-2 border-black  hover:bg-indigo-600 hover:text-white duration-500">
            Publish A Ride
          </button>
        </div>
      </div>
    </div>
  );
}
