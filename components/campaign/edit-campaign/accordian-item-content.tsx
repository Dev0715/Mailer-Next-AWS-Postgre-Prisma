import {
  AccordionContent,
  AccordionItem,
  AccordionTrigger
} from "@/components/ui/accordion";
import { FaCheck, FaNewspaper, FaUser } from "react-icons/fa";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue
} from "@/components/ui/select";
import { Campaign } from "@/shared/campaign-type";
import { Segment } from "@/shared/segment-type";
import { Button } from "@/components/ui/button";

type Props = {
  campaign: Campaign;
  setCampaign: React.Dispatch<React.SetStateAction<Campaign>>;
};

export const AccordianItemContent = ({ campaign, setCampaign }: Props) => {
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
    <AccordionItem value="step-4-content">
      <AccordionTrigger className="hover:no-underline hover:drop-shadow">
        <div className="flex items-start gap-x-4">
          <div
            className={`w-10 h-10 flex items-center justify-center rounded-full ${campaign?.to ? "bg-green-600" : "bg-gray-600"}`}
          >
            <FaCheck className="text-white" />
          </div>
          <div className="flex flex-col items-start">
            <p className="text-xl">Content</p>
            <p className="text-sm text-gray-500">
              Create a email from templates.
            </p>
          </div>
        </div>
      </AccordionTrigger>
      <AccordionContent className="px-1 pt-1">
        <div className="flex flex-col gap-y-2 px-12">
          <Button className="w-64 flex gap-x-2">
            <FaNewspaper />
            Create a new email
          </Button>
        </div>
      </AccordionContent>
    </AccordionItem>
  );
};
