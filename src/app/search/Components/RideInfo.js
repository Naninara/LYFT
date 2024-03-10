"use client";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { FaArrowRight } from "react-icons/fa";
import { FaPersonFalling } from "react-icons/fa6";

export default function RideInfo({ loading, rideInfo }) {
  if (loading) {
    return (
      <div className="w-full h-[40vh] flex justify-center items-center animate-ping">
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
    );
  }

  if (rideInfo && rideInfo.length == 0) {
    return <p className="font-dm text-xl font-bold">OOPS!! No Rides Found</p>;
  }

  if (rideInfo && rideInfo.length !== 0) {
    return rideInfo.map((ele) => {
      return (
        <Link href={`/search/${ele._id}`} key={ele._id}>
          <div
            className="flex p-[2%] flex-wrap flex-col gap-8 font-dm shadow-md font-bold"
            key={ele._id}
          >
            <div className="font-bold flex items-center gap-3">
              <p>{ele.start}</p>
              <FaArrowRight />
              <p>{ele.end}</p>
            </div>
            <div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <p>
                    {ele?.user?.image ? (
                      <Image
                        src={ele?.user?.image}
                        alt="profile"
                        width={50}
                        height={50}
                        className="rounded-full"
                      />
                    ) : (
                      <FaPersonFalling size={20} />
                    )}
                  </p>
                  <p>Posted By: {ele?.user?.name}</p>
                </div>
                <div>₹{ele?.rideAmount}</div>
              </div>
            </div>
          </div>
        </Link>
      );
    });
  }
}
