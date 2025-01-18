"use client";
import Link from "next/link";
import React from "react";
import Image from "next/image";

export const Logo = () => {
  return (
    <Link
      href="/"
      className="font-normal flex space-x-2 items-center text-sm mr-4  text-black px-2 py-1  relative z-20"
    >
      <Image
        src="/icon-128.png"
        className="rounded-full"
        alt="logo"
        width={30}
        height={30}
      />
      <span className="font-medium text-black dark:text-white">Aiforecast</span>
    </Link>
  );
};

