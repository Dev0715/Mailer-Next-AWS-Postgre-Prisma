"use client";

import { getCampaignById } from "@/data/campaign/campaign-by-id";
import { useCurrentUser } from "@/hooks/use-current-user";
import { Campaign } from "@/shared/campaign-type";
import { notFound, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Accordion } from "@/components/ui/accordion";
import { getAllSegmentsByEmail } from "@/data/segment/all-segments";
import { Segment } from "@/shared/segment-type";
import { AccordianItemTo } from "@/components/campaign/edit-campaign/accordian-item-to";
import { AccordianItemFrom } from "@/components/campaign/edit-campaign/accordian-item-from";
import { AccordianItemSubject } from "@/components/campaign/edit-campaign/accordian-item-subject";
import { AccordianItemTime } from "@/components/campaign/edit-campaign/accordian-item-time";
import { AccordianItemContent } from "@/components/campaign/edit-campaign/accordian-item-content";
import { useAtom } from "jotai";
import { campaignAtom, emailAtom } from "@/store/customers-atom";

type Props = {
  params: { campaignId: string };
};

const EditCampaignPage = ({ params: { campaignId } }: Props) => {
  const history = useRouter();
  const user = useCurrentUser();

  const [loadError, setLoadError] = useState<boolean>(false);
  const [segments, setSegments] = useState<Segment[]>([]);

  const [emailTemplate] = useAtom(emailAtom);
  const [campaign, setCampaign] = useAtom(campaignAtom);

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

  const onCreateEmail = () => {
    console.log("Create a new email");
    history.push("/campaign/create-email");
  };

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
        <AccordianItemSubject
          campaign={campaign as Campaign}
          setCampaign={
            setCampaign as React.Dispatch<React.SetStateAction<Campaign>>
          }
        />
        <AccordianItemTime
          campaign={campaign as Campaign}
          setCampaign={
            setCampaign as React.Dispatch<React.SetStateAction<Campaign>>
          }
        />
        <AccordianItemContent
          campaign={campaign as Campaign}
          setCampaign={
            setCampaign as React.Dispatch<React.SetStateAction<Campaign>>
          }
          onCreateEmail={onCreateEmail}
        />
      </Accordion>
    </div>
  );
};

export default EditCampaignPage;
