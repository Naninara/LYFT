"use client";
import { getServerSession } from "next-auth";
import Link from "next/link";
import React, { useState } from "react";
import {
  CiBookmark,
  CiCirclePlus,
  CiLogin,
  CiPaperplane,
  CiSettings,
} from "react-icons/ci";
import { FaBarsStaggered } from "react-icons/fa6";

export default function MobileNav({ session }) {
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
        <div className="items-center gap-3 absolute bg-white h-[90vh] flex items-center left-0 w-full top-[56px] flex-col justify-center">
          <Link
            href={"/publish"}
            onClick={() => {
              setOpen(!isOpen);
            }}
          >
            <p className="flex items-center gap-1 cursor-pointer">
              Publish A Ride <CiCirclePlus fontWeight={1000} size={20} />
            </p>
          </Link>
          <Link
            href={"/postings"}
            onClick={() => {
              setOpen(!isOpen);
            }}
          >
            <p className="flex items-center gap-1 cursor-pointer">
              Your Postings <CiPaperplane fontWeight={1000} size={20} />
            </p>
          </Link>
          <Link
            href={"/bookings"}
            onClick={() => {
              setOpen(!isOpen);
            }}
          >
            <p className="flex items-center gap-1 cursor-pointer">
              Your Bookings <CiBookmark fontWeight={1000} size={20} />
            </p>
          </Link>
          {!session ? (
            <Link
              href={"/signin"}
              onClick={() => {
                setOpen(!isOpen);
              }}
            >
              <p className="flex items-center cursor-pointer gap-1    ">
                Login <CiLogin fontWeight={1000} size={20} />
              </p>
            </Link>
          ) : (
            <Link
              href={"/profile"}
              onClick={() => {
                setOpen(!isOpen);
              }}
            >
              <p className="flex items-center cursor-pointer gap-1">
                Profile <CiSettings fontWeight={1000} size={20} />
              </p>
            </Link>
          )}
        </div>
      )}
    </div>
  );
}
