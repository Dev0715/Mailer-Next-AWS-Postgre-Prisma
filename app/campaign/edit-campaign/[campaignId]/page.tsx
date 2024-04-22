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
import { getAllSegmentsByEmail } from "@/data/segment/all-segments";
import { Segment } from "@/shared/segment-type";
import { FaCheck, FaSave } from "react-icons/fa";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { CampaignFromSchema, CampaignSubjectSchema } from "@/schemas/campaign";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { AccordianItemTo } from "@/components/campaign/edit-campaign/accordian-item-to";
import { AccordianItemFrom } from "@/components/campaign/edit-campaign/accordian-item-from";

type Props = {
  params: { campaignId: string };
};

const EditCampaignPage = ({ params: { campaignId } }: Props) => {
  const user = useCurrentUser();

  const [loadError, setLoadError] = useState<boolean>(false);
  const [campaign, setCampaign] = useState<Campaign>();
  const [segments, setSegments] = useState<Segment[]>([]);

  useEffect(() => {
    getCampaignById(user?.email as string, campaignId).then((campaign) => {
      if (campaign) {
        setCampaign(campaign as Campaign);
      } else {
        setLoadError(true);
      }
    });

    getAllSegmentsByEmail(user?.email as string).then((segments) => {
      if (segments) {
        setSegments(segments as Segment[]);
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
      <Accordion type={"multiple"}>
        <AccordianItemTo
          campaign={campaign as Campaign}
          setCampaign={
            setCampaign as React.Dispatch<React.SetStateAction<Campaign>>
          }
          segments={segments}
        />
        <AccordianItemFrom
          campaign={campaign as Campaign}
          setCampaign={
            setCampaign as React.Dispatch<React.SetStateAction<Campaign>>
          }
        />
      </Accordion>
    </div>
  );
};

export default EditCampaignPage;
