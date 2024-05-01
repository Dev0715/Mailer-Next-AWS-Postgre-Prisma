"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import Link from "next/link";
import { Dispatch, SetStateAction, useState } from "react";
import {
  FaArrowRight,
  FaCloudUploadAlt,
  FaCopy,
  FaFile,
  FaPlus
} from "react-icons/fa";

type OptionCardProps = {
  selected: boolean;
  title: string;
  description: string;
  optionValue: string;
  children: React.ReactNode;
  onClick: Dispatch<SetStateAction<string>>;
};

const OptionCard = ({
  selected,
  title,
  description,
  optionValue,
  onClick,
  children
}: OptionCardProps) => {
  return (
    <Card
      className={`w-full ${selected ? "border-green-700 bg-green-100" : "hover:border-green-700 hover:bg-green-50"}`}
      onClick={() => onClick(optionValue)}
    >
      <CardHeader>
        <div className="w-full flex items-center justify-between">
          {children}
          <RadioGroupItem className="w-6 h-6" value={optionValue} />
        </div>
      </CardHeader>
      <CardContent className="flex flex-col gap-y-1">
        <p className="text-xl font-semibold">{title}</p>
        <p>{description}</p>
      </CardContent>
    </Card>
  );
};

const ContactAdd = () => {
  const SERVICE = "service";
  const FILE = "file";
  const MANNUAL = "mannual";

  const options = [
    {
      title: "Import from another service",
      description: "Import contacts automatically from tools you already use.",
      optionValue: SERVICE,
      children: <FaCloudUploadAlt className="w-6 h-6 text-blue-700" />
    },
    {
      title: "Upload a file",
      description: "Import contacts from a CSV or tab-delimited TXT file.",
      optionValue: FILE,
      children: <FaFile className="w-6 h-6 text-blue-700" />
    },
    {
      title: "Copy and paste",
      description:
        "Directly paste in new contacts from a spreadsheet or similar list.",
      optionValue: MANNUAL,
      children: <FaCopy className="w-6 h-6 text-blue-700" />
    }
  ];

  const [inputMode, setInputMode] = useState<string>(MANNUAL);

  return (
    <main className="w-5/6 flex flex-col py-6">
      <p className="text-4xl font-semibold mb-6">
        How would you like to add contacts?
      </p>
      <p className="text-xl mb-4">
        Build your Mailchimp audience by adding or importing contacts you
        already have permission to market to.
      </p>
      <Link
        href="/"
        className="underline underline-offset-2 mb-2 text-blue-500"
      >
        Learn how consent impacts email deliverability
      </Link>
      <Link
        href="/"
        className="underline underline-offset-2 mb-2 text-blue-500 mb-8"
      >
        Learn how to import SMS contacts
      </Link>
      <RadioGroup value={inputMode}>
        <div className="w-full flex gap-x-6 mb-8">
          {options.map((option) => (
            <OptionCard
              key={option.title}
              selected={option.optionValue === inputMode}
              title={option.title}
              description={option.description}
              optionValue={option.optionValue}
              onClick={setInputMode}
            >
              {option.children}
            </OptionCard>
          ))}
        </div>
      </RadioGroup>
      <div className="flex gap-x-16">
        <Button asChild className="w-64 flex gap-x-2">
          <Link href={`/audience/contacts/from-${inputMode}`}>
            <FaArrowRight />
            Continue
          </Link>
        </Button>
        <Button
          asChild
          className="w-64 flex gap-x-2 bg-blue-700 hover:bg-blue-600"
        >
          <Link href={`/audience/contacts/new-subscriber`}>
            <FaPlus />
            Add a Subscriber
          </Link>
        </Button>
      </div>
    </main>
  );
};

export default ContactAdd;
