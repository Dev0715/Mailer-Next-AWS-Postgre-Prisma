"use client";

import { Button } from "@/components/ui/button";
import { FaArrowLeft, FaFileUpload } from "react-icons/fa";
import Link from "next/link";

const FromFile = () => {
  return (
    <main className="w-5/6 flex flex-col py-6">
      <p className="text-4xl font-semibold mb-6">Upload a File.</p>
      <p className="text-xl mb-8">Not sure how to format your file?</p>

      <Button asChild className="w-64 flex gap-x-2">
        <Link href={`/audience/contacts/add`}>
          <FaArrowLeft />
          Back
        </Link>
      </Button>
    </main>
  );
};

export default FromFile;
