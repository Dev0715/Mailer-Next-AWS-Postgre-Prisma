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

  const [inputMode, setInputMode] = useState<string>(MANNUAL);

  return <main className="w-5/6 flex flex-col py-6"></main>;
};

export default ContactAdd;
