"use client";

import { Button } from "@/components/ui/button";
import Link from "next/link";
import { FaArrowLeft } from "react-icons/fa";

const FromService = () => {
  return (
    <main className="w-5/6 flex flex-col py-6">
      <p className="text-4xl font-semibold mb-6">
        Import existing or future contacts, automatically.
      </p>
      <p className="text-xl mb-8">
        See something familiar? Connect it to your MailManJs account to keep all
        your contacts in sync.
      </p>
      <Button asChild className="w-64 flex gap-x-2">
        <Link href={`/audience/contacts/add`}>
          <FaArrowLeft />
          Back
        </Link>
      </Button>
    </main>
  );
};

export default FromService;
