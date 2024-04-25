import {
  AccordionContent,
  AccordionItem,
  AccordionTrigger
} from "@/components/ui/accordion";
import { FaCheck } from "react-icons/fa";
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

type Props = {
  campaign: Campaign;
  setCampaign: React.Dispatch<React.SetStateAction<Campaign>>;
  segments: Segment[];
};

export const AccordianItemTo = ({ campaign, setCampaign, segments }: Props) => {
  const onToChange = (newValue: string) => {
    if (campaign) {
      setCampaign(
        (prev) =>
          ({
            ...prev,
            to: {
              segmentId: newValue,
              segmentTitle: ""
            }
          }) as Campaign
      );
    }
  };

  return (
    <AccordionItem value="step-0-to">
      <AccordionTrigger className="hover:no-underline hover:drop-shadow">
        <div className="flex items-start gap-x-4">
          <div
            className={`w-10 h-10 flex items-center justify-center rounded-full ${campaign?.to ? "bg-green-600" : "bg-gray-600"}`}
          >
            <FaCheck className="text-white" />
          </div>
          <div className="flex flex-col items-start">
            <p className="text-xl">To</p>
            <p className="text-sm text-gray-500">
              Who are you sending this email to?
            </p>
          </div>
        </div>
      </AccordionTrigger>
      <AccordionContent className="px-1 pt-1">
        <div className="flex flex-col gap-y-2 px-12">
          <p className="text-base text-gray-600 font-medium">
            Select a segment*
          </p>
          <Select value={campaign?.to?.segmentId} onValueChange={onToChange}>
            <SelectTrigger>
              <SelectValue placeholder="Segment you want to send" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>Your Segments</SelectLabel>
                {segments.map((segment, index) => (
                  <SelectItem value={index.toString()}>
                    {segment.title}
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
      </AccordionContent>
    </AccordionItem>
  );
};
