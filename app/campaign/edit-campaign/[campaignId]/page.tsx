"use client";

import { getCampaignById } from "@/data/campaign/campaign-by-id";
import { useCurrentUser } from "@/hooks/use-current-user";
import { Campaign } from "@/shared/campaign-type";
import { notFound } from "next/navigation";
import { useEffect, useState } from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger
} from "@/components/ui/accordion";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue
} from "@/components/ui/select";

type Props = {
  params: { campaignId: string };
};

const EditCampaignPage = ({ params: { campaignId } }: Props) => {
  const user = useCurrentUser();

  const [loadError, setLoadError] = useState<boolean>(false);
  const [campaign, setCampaign] = useState<Campaign>();

  useEffect(() => {
    getCampaignById(user?.email as string, campaignId).then((campaign) => {
      if (campaign) {
        setCampaign(campaign as Campaign);
      } else {
        setLoadError(true);
      }
    });
  }, []);

  if (loadError) {
    return notFound();
  }

  return (
    <div className="w-5/6 flex flex-col gap-y-6 py-6">
      <p className="text-4xl text-green-700 font-semibold">
        Campaign {campaign?.title}
      </p>
      <Accordion type="single" collapsible>
        <AccordionItem value="item-1">
          <AccordionTrigger>
            <p className="text-xl">To</p>
          </AccordionTrigger>
          <AccordionContent>
            <Select>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Select a fruit" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>Fruits</SelectLabel>
                  <SelectItem value="apple">Apple</SelectItem>
                  <SelectItem value="banana">Banana</SelectItem>
                  <SelectItem value="blueberry">Blueberry</SelectItem>
                  <SelectItem value="grapes">Grapes</SelectItem>
                  <SelectItem value="pineapple">Pineapple</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );
};

export default EditCampaignPage;
