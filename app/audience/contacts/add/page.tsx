"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import Link from "next/link";
import { Dispatch, SetStateAction, useRef, useState } from "react";
import { FaArrowRight, FaCloudUploadAlt, FaCopy, FaFile } from "react-icons/fa";

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

  return <main className="w-5/6 flex flex-col py-6"></main>;
};

export default ContactAdd;
