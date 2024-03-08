import Image from "next/image";
import React from "react";

export default function MoreInfoSection() {
  return (
    <div className="py-[30px] md:py-0 h-auto flex-col  md:flex-row md:h-[70vh] flex justify-start items-center w-full  ">
      <div className="w-full md:w-1/2 flex justify-center items-center p-[6%]">
        <Image
          unoptimized={true}
          src={
            "https://res.cloudinary.com/dggryzgok/image/upload/v1709536858/LYFT/hebj96yjlwiw7pvlrbsv.webp"
          }
          className="w-full h-auto object-cover"
          width={300}
          height={300}
          alt="Hero Section"
        />
      </div>
      <div className="px-4 w-full md:w-1/2 flex flex-col gap-4 justify-center md:px-16">
        <h1 className="text-[25px] md:text-[36px] font-dm font-bold">
          Making millions of rides more accessible
        </h1>
        <div className="text-[16px] font-dm ">
          <p>
            A ride is more than just a ride. It is a gateway to opportunities
            and jobs. A connection to community. And access to essentials like
            groceries, healthcare, and polling places. Our Lyft Up initiative
            makes rides more accessible for millions, and helps bring
            communities even closer.
          </p>
        </div>
      </div>
    </div>
  );
}
