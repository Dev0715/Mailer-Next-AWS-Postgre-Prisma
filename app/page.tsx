"use client";

import React from "react";
import { SignupButton } from "@/components/auth/signup-button";
import { WrappedButton } from "@/components/utils/wrapped-button";

const Home = () => {
  return (
    <main className="w-full flex flex-col items-center pt-24 pb-6">
      <p className="text-5xl font-semibold pb-6">Turn Emails into Revenue!</p>
      <p className="w-1/2 text-xl text-center">
        Win new customers with the #1 email marketing and automation platform*
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
