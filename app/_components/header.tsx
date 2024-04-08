"use client";

import Link from "next/link";
import React from "react";
import { Navbar } from "./navbar";

export const Header = () => {
  return (
    <nav className="w-full pb-2 flex justify-center box-border border-b-[1px] z-10">
      <div className="w-5/6 flex items-end justify-between">
        <div className="flex">
          <Link href="/">
            <p className="text-4xl font-semibold text-black drop-shadow-md">
              MailManJS
            </p>
          </Link>
        </div>
        <Navbar />
        <Link href="/auth/login">
          <p className="text-xl font-semibold text-black drop-shadow-md">
            Log In
          </p>
        </Link>
      </div>
    </nav>
  );
};
