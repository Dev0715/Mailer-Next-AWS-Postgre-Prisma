import {
  AccordionContent,
  AccordionItem,
  AccordionTrigger
} from "@/components/ui/accordion";
import { FaCheck, FaSave } from "react-icons/fa";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue
} from "@/components/ui/select";
import { Campaign } from "@/shared/types/campaign";
import { Segment } from "@/shared/types/segment";
import { useEffect, useState, useTransition } from "react";
import { Button } from "@/components/ui/button";
import { FcCancel } from "react-icons/fc";
import { getConditionFromFilters } from "@/shared/functions/condition-from-filters";
import { getNumbersOfSubscribersByCondition } from "@/data/audience/count-subscribers-condition";

type Props = {
  campaign: Campaign;
  setCampaign: React.Dispatch<React.SetStateAction<Campaign>>;
  segments: Segment[];
};

export const AccordionItemTo = ({ campaign, setCampaign, segments }: Props) => {
  const [isPending, startTransition] = useTransition();

  const [isChanged, setChanged] = useState<boolean>(false);
  const [error, setError] = useState<string>("");
  const [selectedIndex, setSelectedIndex] = useState<number>(-1);

  useEffect(() => {
    setCampaignIndex();
  }, [campaign]);

  const setCampaignIndex = () => {
    if (campaign?.to) {
      const index = segments.findIndex(
        (segment) => segment.segmentId === campaign.to?.segmentId
      );
      setSelectedIndex(index);
    }
  };

  const onToChange = (newValue: string) => {
    setSelectedIndex(parseInt(newValue));
    setChanged(true);
    setError("");
  };

  const onSave = () => {
    startTransition(() => {
      const condition = getConditionFromFilters(
        segments[selectedIndex].filters
      );
      getNumbersOfSubscribersByCondition(condition).then((_count) => {
        const totalNumber = _count || 0;
        if (totalNumber === 0) {
          setError("No subscribers found in this segment");
          // setError
          return;
        }
        if (campaign) {
          setCampaign(
            (prev) =>
              ({
                ...prev,
                to: {
                  segmentId: segments[selectedIndex].segmentId,
                  segmentTitle: segments[selectedIndex].title,
                  totalNumber
                }
              }) as Campaign
          );
        }
      });
    });
  };

  const onCancel = () => {
    setCampaignIndex();
    setChanged(false);
    setError("");
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
        <div className="flex flex-col gap-y-4 px-12">
          <div className="flex flex-col gap-y-2">
            <p
              className={`text-base text-gray-600 font-medium ${error ? "text-red-600" : ""}`}
            >
              Select a segment*
            </p>
            <Select
              value={selectedIndex.toString()}
              onValueChange={onToChange}
              disabled={isPending}
            >
              <SelectTrigger>
                <SelectValue placeholder="Segment you want to send" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>Your Segments</SelectLabel>
                  {segments.map((segment, index) => (
                    <SelectItem
                      key={segment.segmentId}
                      value={index.toString()}
                    >
                      {segment.title}
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
          {error && <p className="text-xs text-red-600">{error}</p>}
          <div className="flex gap-x-4">
            <Button
              disabled={!isChanged || isPending}
              variant="outline"
              className="w-48 flex items-center gap-x-2 border-green-700"
              onClick={onSave}
            >
              <FaSave className="text-green-700" />
              Save
            </Button>
            <Button
              disabled={!isChanged || isPending}
              variant="outline"
              className="w-48 flex items-center gap-x-2 border-red-700"
              onClick={onCancel}
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
