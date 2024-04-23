import {
  AccordionContent,
  AccordionItem,
  AccordionTrigger
} from "@/components/ui/accordion";
import { FaCheck } from "react-icons/fa";
import { Campaign } from "@/shared/campaign-type";

type Props = {
  campaign: Campaign;
  setCampaign: React.Dispatch<React.SetStateAction<Campaign>>;
};

export const AccordianItemTime = ({ campaign, setCampaign }: Props) => {
  const onToChange = (newValue: string) => {
    if (campaign) {
      setCampaign(
        (prev) =>
          ({
            ...prev,
            to: newValue
          }) as Campaign
      );
    }
  };

  return (
    <AccordionItem value="step-3-time">
      <AccordionTrigger className="hover:no-underline hover:drop-shadow">
        <div className="flex items-start gap-x-4">
          <div
            className={`w-10 h-10 flex items-center justify-center rounded-full ${campaign?.to ? "bg-green-600" : "bg-gray-600"}`}
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
        <div className="flex flex-col gap-y-2">
          <p className="text-base text-gray-600 font-medium">
            Select a segment*
          </p>
        </div>
      </AccordionContent>
    </AccordionItem>
  );
};
