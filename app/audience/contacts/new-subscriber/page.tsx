"use client";

import { Button } from "@/components/ui/button";
import { FaArrowLeft, FaFileUpload } from "react-icons/fa";
import Link from "next/link";

const NewSubscriber = () => {
  return (
    <main className="w-5/6 flex flex-col py-6">
      <p className="text-4xl font-semibold mb-6">Add a subscriber.</p>
      <div className="flex items-end gap-x-4 mb-8">
        <p className="text-xl">
          Want to subscribe more than one person at a time?
        </p>
        <Link
          href="/contacts/add"
          className="underline underline-offset-2 text-blue-500"
        >
          Import an audience
        </Link>
      </div>
      <Button asChild className="w-64 flex gap-x-2">
        <Link href={`/audience/contacts/add`}>
          <FaArrowLeft />
          Back
        </Link>
      </Button>
    </main>
  );
};

export default NewSubscriber;
