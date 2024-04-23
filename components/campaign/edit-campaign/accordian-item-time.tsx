import {
  AccordionContent,
  AccordionItem,
  AccordionTrigger
} from "@/components/ui/accordion";
import { FaCheck, FaSave } from "react-icons/fa";
import { Campaign } from "@/shared/campaign-type";
import { useState } from "react";
import { TimeSelect } from "./time-select";
import { Button } from "@/components/ui/button";
import { FcCancel } from "react-icons/fc";

type Props = {
  campaign: Campaign;
  setCampaign: React.Dispatch<React.SetStateAction<Campaign>>;
};

export const AccordianItemTime = ({ campaign, setCampaign }: Props) => {
  const [instant, setInstant] = useState<boolean>(false);

  return (
    <AccordionItem value="step-3-time">
      <AccordionTrigger className="hover:no-underline hover:drop-shadow">
        <div className="flex items-start gap-x-4">
          <div
            className={`w-10 h-10 flex items-center justify-center rounded-full ${campaign?.time ? "bg-green-600" : "bg-gray-600"}`}
          >
            <FaCheck className="text-white" />
          </div>
          <div className="flex flex-col items-start">
            <p className="text-xl">Send time</p>
            <p className="text-sm text-gray-500">
              When should we send this email?
            </p>
          </div>
        </div>
      </AccordionTrigger>
      <AccordionContent className="px-1 pt-1">
        <div className="flex flex-col gap-y-4 px-12">
          <div className="w-full flex gap-x-6">
            <TimeSelect
              focus={!instant}
              title="Schedule a time"
              message="Optimize your timing"
              onClick={() => {
                setInstant(false);
              }}
            />
            <TimeSelect
              focus={instant}
              title="Send now"
              message="Get your email out there now"
              onClick={() => {
                setInstant(true);
              }}
            />
          </div>
          {!instant && (
            <div className="w-full flex flex-col">
              <p className="text-base text-gray-600 font-medium">
                Select a time*
              </p>
            </div>
          )}
          <div className="flex gap-x-4">
            <Button
              variant="outline"
              className="w-48 flex items-center gap-x-2 border-green-700"
            >
              <FaSave className="text-green-700" />
              Save
            </Button>
            <Button
              variant="outline"
              className="w-48 flex items-center gap-x-2 border-red-700"
            >
              <FcCancel />
              Cancel
            </Button>
          </div>
        </div>
      </AccordionContent>
    </AccordionItem>
  );
};
