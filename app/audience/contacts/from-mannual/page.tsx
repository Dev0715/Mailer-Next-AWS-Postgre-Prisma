"use client";

import { Textarea } from "@/components/ui/textarea";
import Link from "next/link";
import { useState } from "react";

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
      <div className="flex flex-col text-lg font-medium">
        <p>
          Paste your contact information into this box using commas to separate
          each field.
        </p>
        <p>There should be one contact per line.</p>
      </div>
      <Textarea
        value={inputText}
        onChange={(e) => setInputText(e.target.value)}
      />
    </main>
  );
};

export default FromMannual;
