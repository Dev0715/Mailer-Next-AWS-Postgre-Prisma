"use client";

import React from "react";
import { Poppins } from "next/font/google";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { useCurrentUser } from "@/hooks/use-current-user";
import Link from "next/link";
import { SignupButton } from "@/components/auth/signup-button";
import { WrappedButton } from "@/components/utils/wrapped-button";

const font = Poppins({
  subsets: ["latin"],
  weight: ["600"]
});

const Home = () => {
  const user = useCurrentUser();

  return (
    <main className="w-full flex flex-col items-center pt-24 pb-6">
      <p className="text-5xl font-semibold pb-6">Turn Emails into Revenue!</p>
      <p className="w-1/2 text-xl text-center">
        Win new customers with the #1 email marketing and automations platform*
      </p>
      <p className="text-xl pb-12">
        that recommends ways to get more opens, clicks, and sales.
      </p>
      <SignupButton>
        <WrappedButton className="w-64">Sign Up Now</WrappedButton>
      </SignupButton>
    </main>
  );
};

export default Home;
