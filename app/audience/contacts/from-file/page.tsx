"use client";

import { Button } from "@/components/ui/button";
import { FaArrowLeft, FaFileUpload } from "react-icons/fa";
import Link from "next/link";
import { useRef } from "react";
import { Input } from "@/components/ui/input";

const FromFile = () => {
  const hiddenFileInput = useRef<HTMLInputElement>(null);

  const onFileSelected = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const text = e.target?.result;
        console.log(text);
      };
      reader.readAsText(file);
    }
  };

  return (
    <main className="w-5/6 flex flex-col py-6">
      <p className="text-4xl font-semibold mb-6">Upload a File.</p>
      <p className="text-xl mb-8">Not sure how to format your file?</p>
      <Link
        href="/"
        className="underline underline-offset-2 mb-2 text-blue-500"
      >
        Help me format my CSV
      </Link>
      <Link
        href="/"
        className="underline underline-offset-2 mb-2 text-blue-500 mb-8"
      >
        Watch a tutorial
      </Link>
      <Input
        className="hidden"
        type="file"
        accept="text/*"
        ref={hiddenFileInput}
        onChange={onFileSelected}
      />
      <Button
        disabled={isLoading}
        variant="outline"
        className="w-96 h-32 flex gap-x-2 border-green-700 mb-8"
        onClick={() => hiddenFileInput.current?.click()}
      >
        <FaFileUpload />
        Browse
      </Button>
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
