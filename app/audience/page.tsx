"use client";

import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import AreaChartPlot from "@/components/utils/areachart-plot";
import { FaArrowUp } from "react-icons/fa";

const Blue = ({ children }: { children: React.ReactNode }) => {
  return <span className="text-blue-700">{children}</span>;
};

const Strong = ({ children }: { children: React.ReactNode }) => {
  return <span className="font-semibold">{children}</span>;
};

const AudiencePage = () => {
  return (
    <main className="w-5/6 flex flex-col py-6">
      <p className="text-5xl text-green-700 font-semibold pb-6">
        Audience Dashboard
      </p>
      <p className="text-2xl font-semibold pb-2">Hi, Malachi Uy!</p>
      <p className="text-xl pb-6">
        Your audience has{" "}
        <Blue>
          <Strong>{totalNumber}</Strong>{" "}
        </Blue>{" "}
        contacts.{" "}
        <Blue>
          <Strong>{validatedNumber}</Strong>
        </Blue>{" "}
        of these are validated.
      </p>

      <div className="w-full flex gap-x-6 pb-6">
        <Card className="w-[400px] flex items-center justify-between px-8 py-4">
          <div className="flex flex-col gap-y-2">
            <p className="text-xl font-semibold">Subscribers</p>
            <p className="text-lg font-semibold">{totalNumber}</p>
            <p className="text-base text-gray-700">
              from {lastNumber} (last 4 weeks)
            </p>
          </div>
          <Badge variant="default" className="flex gap-x-1 py-1 rounded-full">
            <FaArrowUp /> {increasedPercent}%
          </Badge>
        </Card>
        <Card className="w-[400px] flex items-center justify-between px-8 py-4">
          <div className="flex flex-col gap-y-2">
            <p className="text-xl font-semibold">Open Rate</p>
            <p className="text-lg font-semibold">10</p>
            <p className="text-base text-gray-700">from 0 (last 4 weeks)</p>
          </div>
          <Badge
            variant={"secondary"}
            className="flex gap-x-1 py-1 rounded-full"
          >
            - 0%
          </Badge>
        </Card>
        <Card className="w-[400px] flex items-center justify-between px-8 py-4">
          <div className="flex flex-col gap-y-2">
            <p className="text-xl font-semibold">Click Rate</p>
            <p className="text-lg font-semibold">30</p>
            <p className="text-base text-gray-700">from 0 (last 4 weeks)</p>
          </div>
          <Badge
            variant={"secondary"}
            className="flex gap-x-1 py-1 rounded-full"
          >
            - 0%
          </Badge>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="text-2xl">Recent Growth</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="w-full h-[480px]">
            <AreaChartPlot />
          </div>
        </CardContent>
      </Card>
    </main>
  );
};

export default AudiencePage;
