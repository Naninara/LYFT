"use client";
import React, { useState } from "react";
import { CiCirclePlus, CiLogin } from "react-icons/ci";
import { FaBarsStaggered } from "react-icons/fa6";
export default function MobileNav() {
  const [isOpen, setOpen] = useState(false);
  return (
    <div>
      <div>
        <FaBarsStaggered
          size={20}
          onClick={() => {
            setOpen(!isOpen);
          }}
        />
      </div>
      {isOpen && (
        <div className="items-center gap-3 absolute bg-white z-10 h-screen flex items-center left-0 w-full top-[56px] flex-col justify-center">
          <p className="flex items-center gap-1 cursor-pointer">
            Publish A Ride <CiCirclePlus fontWeight={1000} size={20} />
          </p>
          <p className="flex items-center cursor-pointer gap-1    ">
            Login <CiLogin fontWeight={1000} size={20} />
          </p>
        </div>
      )}
    </div>
  );
}
