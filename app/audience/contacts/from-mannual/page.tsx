"use client";

import Link from "next/link";

const FromMannual = () => {
  return (
    <main className="w-5/6 flex flex-col py-6">
      <p className="text-4xl font-semibold mb-6">
        Copy and paste your contacts
      </p>
      <div className="flex items-end gap-x-4">
        <p className="text-xl">Not sure how to format your file?</p>
        <Link href="/" className="underline underline-offset-2 text-blue-500">
          Learn how
        </Link>
      </div>
    </main>
  );
};

export default FromMannual;
