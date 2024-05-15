"use client";

import { CampaignStateBadge } from "@/components/campaign/campaign-state-badge";
import { EmailList } from "@/components/campaign/emails-list";
import { Button } from "@/components/ui/button";
import { HTMLRenderer } from "@/components/utils/html-renderer";
import { getCampaignById } from "@/data/campaign/campaign-by-id";
import { Campaign, CampaignState } from "@/shared/types/campaign";
import Link from "next/link";
import { useEffect, useState } from "react";

type Props = {
  params: {
    campaignId: string;
  };
};

const CampaignDetails = ({ params: { campaignId } }: Props) => {
  const [campaign, setCampaign] = useState<Campaign>();

  const [isEmailsListOpen, setIsEmailsListOpen] = useState<boolean>(false);
  const [emailListTitle, setEmailListTitle] = useState<string>("");
  const [emailList, setEmailList] = useState<string[]>([]);

  useEffect(() => {
    getCampaignById(campaignId).then((_campaign) => {
      if (_campaign) {
        setCampaign(_campaign as unknown as Campaign);
      }
    });
  }, []);

  const onOpenedEmailList = () => {
    setEmailListTitle("Opened Emails");
    setEmailList(campaign?.openedEmails || []);
    setIsEmailsListOpen(true);
  };

  const onUnsubEmailList = () => {
    setEmailListTitle("Unsubscribed Emails");
    setEmailList(campaign?.unsubscribedEmails || []);
    setIsEmailsListOpen(true);
  };

  const onBouncedEmailList = () => {
    setEmailListTitle("Bounced Emails");
    setEmailList(campaign?.bouncedEmails || []);
    setIsEmailsListOpen(true);
  };

  return (
    <div className="w-5/6 flex flex-col gap-y-6 py-6">
      <EmailList
        open={isEmailsListOpen}
        emailList={emailList}
        emailListTitle={emailListTitle}
        onOpenChange={setIsEmailsListOpen}
      />
      <div className="flex items-center gap-x-4">
        <p className="text-2xl">
          Campaign Details for <strong>{campaign?.title}</strong>
        </p>
        <CampaignStateBadge state={campaign?.state as CampaignState} />
      </div>
      <div className="w-full flex gap-x-6">
        <div className="w-1/2 flex flex-col gap-y-6">
          <div className="flex items-center gap-x-4">
            <p className="text-lg">Subject: </p>
            <p className="text-lg font-semibold">
              {campaign?.subject
                ? campaign.subject.subject +
                  (campaign.subject.preview
                    ? " " + campaign.subject.preview
                    : "")
                : ""}
            </p>
          </div>
          <div className="flex items-center gap-x-4">
            <p className="text-lg">Last Edited: </p>
            <p className="text-lg font-semibold">
              {campaign?.lastUpdated
                ? `${campaign.lastUpdated.toDateString()} ${campaign.lastUpdated.toLocaleTimeString()}`
                : ""}
            </p>
          </div>
          <div className="flex items-center gap-x-4">
            <p className="text-lg">To: </p>
            {campaign?.to ? (
              <Button variant={"link"} className="px-0 text-lg">
                <Link href={`/audience/segments/${campaign?.to?.segmentId}`}>
                  <strong>
                    {`${campaign?.to?.segmentTitle}${campaign?.to?.totalNumber ? ` (${campaign?.to?.totalNumber} subscribers)` : ""}`}
                  </strong>
                </Link>
              </Button>
            ) : (
              ""
            )}
          </div>
          <div className="flex items-center gap-x-4">
            <p className="text-lg">From: </p>
            <p className="text-lg font-semibold">
              {campaign?.from
                ? `${campaign.from.name} : ${campaign.from.email}`
                : ""}
            </p>
          </div>
          <div className="flex items-center gap-x-4">
            <p className="text-lg capitalize">{campaign?.state} Time:</p>
            <p className="text-lg font-semibold">
              {campaign?.time
                ? `${campaign.time.date.toDateString()} ${campaign.time.date.toLocaleDateString()}`
                : ""}
            </p>
          </div>
          <div className="flex items-center gap-x-4">
            <p className="text-lg capitalize">Opened Emails:</p>
            <Button
              variant={"link"}
              className="px-0"
              onClick={onOpenedEmailList}
            >
              <p className="text-lg font-semibold">
                {campaign?.openedEmails ? campaign.openedEmails.length : ""}
              </p>
            </Button>
          </div>
          <div className="flex items-center gap-x-4">
            <p className="text-lg capitalize">Unsubscribed Emails:</p>
            <Button
              variant={"link"}
              className="px-0"
              onClick={onUnsubEmailList}
            >
              <p className="text-lg font-semibold">
                {campaign?.unsubscribedEmails
                  ? campaign.unsubscribedEmails.length
                  : ""}
              </p>
            </Button>
          </div>
          <div className="flex items-center gap-x-4">
            <p className="text-lg capitalize">Bounced Emails:</p>
            <Button
              variant={"link"}
              className="px-0"
              onClick={onBouncedEmailList}
            >
              <p className="text-lg font-semibold">
                {campaign?.bouncedEmails ? campaign.bouncedEmails.length : ""}
              </p>
            </Button>
          </div>
        </div>
        <div className="w-1/2 flex flex-col gap-y-6">
          <p className="text-lg font-semibold drop-shadow-md">Email Preview</p>
          {campaign?.email?.html ? (
            <HTMLRenderer htmlString={campaign?.email?.html as string} />
          ) : (
            <div className="w-full h-full flex items-center justify-center border border-gray-200 rounded-xl">
              <p className="text-lg text-gray-500">
                No email content to preview
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CampaignDetails;
