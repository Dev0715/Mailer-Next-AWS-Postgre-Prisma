"use client";

import Link from "next/link";
import React from "react";
import { Navbar } from "./navbar";

export const Header = () => {
  return (
    <nav className="w-full flex justify-center box-border border-b-[1px] z-10">
      <div className="w-5/6 flex items-center justify-between pb-4 top-6 ">
        <div className="flex">
          <Link href="/">
            <p className="text-4xl font-semibold text-black drop-shadow-md">MailManJS</p>
          </Link>
        </div>
        <Navbar />
        <Link href="/auth/login">
            <p className="text-xl font-semibold text-black drop-shadow-md">Log In</p>
        </Link>
      </div>
    </nav>
  );
};
