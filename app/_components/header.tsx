"use client";

import Link from "next/link";
import React from "react";
import { Navbar } from "./navbar";
import { UserButton } from "@/components/auth/user-button";
import { usePathname } from "next/navigation";

export const Header = () => {
  const path = usePathname();
  if (path.indexOf("/unsubscribe") === 0) {
    return null;
  }

  return (
    <nav className="w-full flex justify-center box-border border-b-[1px] z-10">
      <div className="w-5/6 flex items-center justify-between">
        <div className="flex">
          <Link href="/">
            <p className="text-4xl font-semibold text-black drop-shadow-md pb-4">
              MailManJS
            </p>
          </Link>
        </div>
        <Navbar />
        <UserButton />
      </div>
    </nav>
  );
};
