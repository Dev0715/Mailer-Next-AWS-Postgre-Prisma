"use client";

import { getCampaignById } from "@/data/campaign/campaign-by-id";
import { useCurrentUser } from "@/hooks/use-current-user";
import { Campaign } from "@/shared/campaign-type";
import { notFound, useRouter } from "next/navigation";
import { useEffect, useState, useTransition } from "react";
import { Accordion } from "@/components/ui/accordion";
import { getAllSegmentsByEmail } from "@/data/segment/all-segments";
import { Segment } from "@/shared/segment-type";
import { AccordianItemTo } from "@/components/campaign/edit-campaign/accordian-item-to";
import { AccordianItemFrom } from "@/components/campaign/edit-campaign/accordian-item-from";
import { AccordianItemSubject } from "@/components/campaign/edit-campaign/accordian-item-subject";
import { AccordianItemTime } from "@/components/campaign/edit-campaign/accordian-item-time";
import { AccordianItemContent } from "@/components/campaign/edit-campaign/accordian-item-content";
import { useAtom } from "jotai";
import { savedEmailAtom } from "@/store/saved-email-atom";
import { savedCampaignAtom } from "@/store/saved-campaign-atom";
import { HTMLRenderer } from "@/components/utils/html-renderer";
import { Button } from "@/components/ui/button";
import { FaArrowRight, FaSave } from "react-icons/fa";
import { updateCampaign } from "@/data/campaign/update-campaign";
import { ConfirmAlert } from "@/components/utils/confirm-alert";

type Props = {
  params: { campaignId: string };
};

const EditCampaignPage = ({ params: { campaignId } }: Props) => {
  const user = useCurrentUser();
  const history = useRouter();

  const [loadError, setLoadError] = useState<boolean>(false);
  const [segments, setSegments] = useState<Segment[]>([]);
  const [campaign, setCampaign] = useState<Campaign>();

  const [isConfirming, setConfirming] = useState<boolean>(false);
  const [isPending, startTransition] = useTransition();

  const [savedEmail, setSavedEmail] = useAtom(savedEmailAtom);
  const [savedCampaign, setSavedCampaign] = useAtom(savedCampaignAtom);

  useEffect(() => {
    getAllSegmentsByEmail(user?.email as string).then((segments) => {
      if (segments) {
        setSegments(segments as Segment[]);
      }
    });

    if (savedCampaign.isSaved) {
      setCampaign({
        ...savedCampaign.campaign,
        email: savedEmail.email
      });
      clearRelavantAtoms();
    } else {
      getCampaignById(user?.email as string, campaignId).then((campaign) => {
        if (campaign) {
          setCampaign(campaign as Campaign);
        } else {
          setLoadError(true);
        }
      });
    }
  }, []);

  const clearRelavantAtoms = () => {
    setSavedCampaign({
      isSaved: false,
      campaign: savedCampaign.campaign
    });
    setSavedEmail({
      isSaved: false,
      email: savedEmail.email
    });
  };

  const onCreateEmail = () => {
    setSavedCampaign({
      isSaved: true,
      campaign: campaign as Campaign
    });
    if (campaign?.email) {
      setSavedEmail({
        isSaved: true,
        email: campaign.email
      });
    }
    history.push("/campaign/create-email");
  };

  const onFinishLater = () => {
    startTransition(() => {
      updateCampaign(campaign as Campaign)
        .then((res) => {
          if (res) {
            history.push("/campaign");
          } else {
            setConfirming(true);
          }
        })
        .catch((error) => {
          setConfirming(true);
        });
    });
  };

  const isAbleToSend = () => {
    return (
      campaign?.to &&
      campaign.from &&
      campaign.subject &&
      campaign.time &&
      campaign.email
    );
  };

  const onSend = () => {
    // # Create cron or trigger
    // transporter.sendMail({
    //   from: "malachi.uudev@gmail.com",
    //   to: "andrei.devcasian@gmail.com",
    //   subject: "Test-Email",
    //   html: campaign?.email?.html
    // });
    const command = new SendEmailCommand({
      Source: "malachi.uudev@gmail.com",
      Destination: {
        ToAddresses: ["andrei.devcasian@gmail.com"]
      },
      Message: {
        Body: {
          Html: {
            Data: campaign?.email?.html
          }
        },
        Subject: {
          Data: campaign?.subject?.subject
        }
      }
    });

    sesClient.send(command).then((res) => {
      console.log(res);
    });
  };

  if (loadError) {
    return notFound();
  }

  return (
    <div className="w-5/6 flex flex-col gap-y-6 py-6">
      <ConfirmAlert
        open={isConfirming}
        title="Failure"
        description="Failed to update campaign"
        onAlertDialogClosed={() => setConfirming(false)}
      />
      <div className="w-full flex items-end justify-between">
        <p className="text-4xl text-green-700 font-semibold">
          Campaign {campaign?.title}
        </p>
      </div>
      <div className="w-full flex gap-x-6">
        <div className="w-2/3 flex flex-col gap-y-6">
          <Accordion type={"multiple"} className="w-full">
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
          <div className="flex items-center gap-x-6">
            <Button
              disabled={isPending}
              variant={"outline"}
              className="w-40 flex gap-x-2 border-green-700"
              onClick={onFinishLater}
            >
              <FaSave />
              Finish Later
            </Button>
            <Button
              disabled={isPending}
              variant={"default"}
              className="w-32 flex gap-x-2"
              onClick={onSend}
            >
              <FaArrowRight />
              Send
            </Button>
          </div>
        </div>
        <div className="w-1/3 flex flex-col gap-y-4">
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

export default EditCampaignPage;
