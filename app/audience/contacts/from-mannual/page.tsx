"use client";

import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useCurrentUser } from "@/hooks/use-current-user";
import Link from "next/link";
import { useState, useTransition } from "react";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";

const FromMannual = () => {
  const user = useCurrentUser();

  const [inputText, setInputText] = useState<string>("");
  const [isLoading, setLoading] = useState<boolean>(false);

  const recognizeLine = async (str: string) => {
    const fields = str.split(",");

    if (fields.length < 6) {
      return 0;
    }

    const contact = {
      subscriberEmail: fields[0],
      firstName: fields[1],
      lastName: fields[2],
      address: fields[3],
      phoneNumber: fields[4],
      birthday: fields[5]
    };
  };

  const onContinueOrganize = () => {
    startTransition(() => {
      const lines = inputText.split("\n");
      lines.map((line) => {
        recognizeLine(line);
      });
    });
  };

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
        className="h-64 border-green-500 mb-8"
        value={inputText}
        onChange={(e) => setInputText(e.target.value)}
        placeholder="Email, First Name, Last Name, Address, Phone Number, Birthday"
      />
      <div className="flex justify-between">
        <Button
          disabled={isPending}
          className="w-64 flex gap-x-2 bg-red-700 hover:bg-red-600"
          asChild
        >
          <Link href="/audience/contacts/add">
            <FaArrowLeft />
            Back
          </Link>
        </Button>
        <Button
          disabled={isPending}
          className="w-64 flex gap-x-2"
          onClick={onContinueOrganize}
        >
          <FaArrowRight />
          Continue to Organize
        </Button>
      </div>
    </main>
  );
};

export default FromMannual;
