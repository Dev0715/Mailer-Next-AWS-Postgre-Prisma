"use client";

import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import Link from "next/link";
import { useState } from "react";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";

const FromMannual = () => {
  const [inputText, setInputText] = useState<string>("");

  return (
    <main className="w-5/6 flex flex-col py-6">
      <p className="text-4xl font-semibold mb-6">
        Copy and paste your contacts
      </p>
      <div className="flex items-end gap-x-4 mb-8">
        <p className="text-xl">Not sure how to format your file?</p>
        <Link href="/" className="underline underline-offset-2 text-blue-500">
          Learn how
        </Link>
      </div>
      <div className="flex flex-col text-lg font-medium mb-4">
        <p>
          Paste your contact information into this box using commas to separate
          each field.
        </p>
        <p>There should be one contact per line.</p>
      </div>
      <Textarea
        className="h-64 mb-8"
        value={inputText}
        onChange={(e) => setInputText(e.target.value)}
      />
      <div className="flex justify-between">
        <Button
          asChild
          className="w-64 flex gap-x-2 bg-red-700 hover:bg-red-600"
        >
          <Link href="/audience/contacts/add">
            <FaArrowLeft />
            Back
          </Link>
        </Button>
        <Button asChild className="w-64 flex gap-x-2">
          <Link href="/">
            <FaArrowRight />
            Continue to Organize
          </Link>
        </Button>
      </div>
    </main>
  );
};

export default FromMannual;
