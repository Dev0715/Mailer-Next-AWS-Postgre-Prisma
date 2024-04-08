"use client";

import React from "react";
import { Poppins } from "next/font/google";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { useCurrentUser } from "@/hooks/use-current-user";
import Link from "next/link";

const font = Poppins({
  subsets: ["latin"],
  weight: ["600"]
});

const Home = () => {
  const user = useCurrentUser();

  return (
    <main className="w-full flex justify-center pt-24 pb-6">HomePage</main>
  );
};

export default Home;
