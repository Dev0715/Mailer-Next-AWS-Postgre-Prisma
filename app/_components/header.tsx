"use client";

import Link from "next/link";
import React from "react";

export const Header = () => {
  return (
    <nav className="w-full z-10">
      <div className="w-full flex items-end justify-between pb-4 top-6 box-border border-b-[1px]">
        <div className="flex">
          <Link href="/">
            <p className="text-4xl font-semibold text-black drop-shadow-md">MailManJS</p>
          </Link>
        </div>
        <Link href="/auth/login">
            <p className="text-xl font-semibold text-black drop-shadow-md">Log In</p>
        </Link>
      </div>
    </nav>
  );
};
