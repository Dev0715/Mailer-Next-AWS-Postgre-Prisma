"use client";

import { getCampaignById } from "@/data/campaign/campaign-by-id";
import { useCurrentUser } from "@/hooks/use-current-user";
import { Campaign } from "@/shared/types/campaign";
import { notFound, useRouter } from "next/navigation";
import { useEffect, useState, useTransition } from "react";
import { Accordion } from "@/components/ui/accordion";
import { getAllSegmentsByEmail } from "@/data/segment/all-segments";
import { Segment } from "@/shared/types/segment";
import { AccordionItemTo } from "@/components/campaign/edit-campaign/accordian-item-to";
import { AccordionItemFrom } from "@/components/campaign/edit-campaign/accordian-item-from";
import { AccordionItemSubject } from "@/components/campaign/edit-campaign/accordian-item-subject";
import { AccordionItemTime } from "@/components/campaign/edit-campaign/accordian-item-time";
import { AccordionItemContent } from "@/components/campaign/edit-campaign/accordian-item-content";
import { useAtom } from "jotai";
import { savedEmailAtom } from "@/store/saved-email-atom";
import { savedCampaignAtom } from "@/store/saved-campaign-atom";
import { HTMLRenderer } from "@/components/utils/html-renderer";
import { Button } from "@/components/ui/button";
import { FaArrowRight, FaSave } from "react-icons/fa";
import { updateCampaign } from "@/data/campaign/campaign-update";
import { ConfirmAlert } from "@/components/utils/confirm-alert";
import { updateCampaignState } from "@/data/campaign/campaign-update-state";
import { runCampaign } from "@/actions/campaign/run-campaign";
import { scheduleCampaign } from "@/actions/campaign/schedule-campaign";

type Props = {
  params: { campaignId: string };
};

const EditCampaignPage = ({ params: { campaignId } }: Props) => {
  const user = useCurrentUser();
  const history = useRouter();

  const [loadError, setLoadError] = useState<boolean>(false);
  const [segments, setSegments] = useState<Segment[]>([]);
  const [campaign, setCampaign] = useState<Campaign>();

  const [error, setError] = useState<string>("");
  const [isPending, startTransition] = useTransition();

  const [savedEmail, setSavedEmail] = useAtom(savedEmailAtom);
  const [savedCampaign, setSavedCampaign] = useAtom(savedCampaignAtom);

  useEffect(() => {
    getAllSegmentsByEmail(user?.email as string).then((response) => {
      setSegments(response.items as Segment[]);
    });

    if (savedCampaign.isSaved) {
      setCampaign({
        ...savedCampaign.campaign,
        email: savedEmail.email
      });
      clearRelevantAtoms();
    } else {
      //  getCampaignById(user?.email as string, campaignId).then((campaign) => {
      getCampaignById(campaignId).then((campaign) => {
        if (campaign) {
          setCampaign(campaign as unknown as Campaign);
        } else {
          setLoadError(true);
        }
      });
    }
  }, []);

  const clearRelevantAtoms = () => {
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
      updateCampaign({
        ...campaign,
        state: "draft",
        lastUpdated: new Date()
      } as Campaign).then((res) => {
        if (res.success) {
          history.push("/campaign");
        } else {
          setError("Failed to save campaign");
        }
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

  const sendInstantly = async () => {
    const _response = await updateCampaign({
      ...campaign,
      state: "sending",
      lastUpdated: new Date()
    } as Campaign);

    if (_response.error) {
      return { error: "Failed to save campaign" };
    }

    const response = await runCampaign(campaignId);
    if (response.error) {
      updateCampaignState(campaignId, "failed");
      return { error: "Failed to send campaign" };
    }
    return { success: true };
  };

  const sendScheduled = async () => {
    const _response = await updateCampaign({
      ...campaign,
      state: "scheduled",
      lastUpdated: new Date()
    } as Campaign);

    if (_response.error) {
      return { error: "Failed to save campaign" };
    }

    const scheduledTime = campaign?.time?.date as Date;
    if (scheduledTime < new Date()) {
      return { error: "Scheduled time should be in future" };
    }

    const _scheduledTime = scheduledTime.toISOString().split(".")[0];
    const response = await scheduleCampaign(campaignId, _scheduledTime);

    if (response.error) {
      updateCampaignState(campaignId, "failed");
      return { error: "Failed to schedule campaign" };
    }

    return { success: true };
  };

  const onSend = () => {
    // ## You can send TEST email
    startTransition(() => {
      if (campaign?.time?.instant) {
        sendInstantly().then((res) => {
          if (res.error) {
            setError(res.error);
          } else {
            history.push("/campaign");
          }
        });
      } else {
        sendScheduled().then((res) => {
          if (res.error) {
            setError(res.error);
          } else {
            history.push("/campaign");
          }
        });
      }
    });
  };

  if (loadError) {
    return notFound();
  }

  return (
    <div className="w-5/6 flex flex-col gap-y-6 py-6">
      <ConfirmAlert
        open={!!error}
        title="Failure"
        description={error}
        onAlertDialogClosed={() => setError("")}
      />
      <div className="w-full flex items-end justify-between">
        <p className="text-4xl text-green-700 font-semibold">
          Campaign {campaign?.title}
        </p>
      </div>
      <div className="w-full flex gap-x-6">
        <div className="w-2/3 flex flex-col gap-y-6">
          <Accordion type={"multiple"} className="w-full">
            <AccordionItemTo
              campaign={campaign as Campaign}
              setCampaign={
                setCampaign as React.Dispatch<React.SetStateAction<Campaign>>
              }
              segments={segments}
            />
            <AccordionItemFrom
              campaign={campaign as Campaign}
              setCampaign={
                setCampaign as React.Dispatch<React.SetStateAction<Campaign>>
              }
            />
            <AccordionItemSubject
              campaign={campaign as Campaign}
              setCampaign={
                setCampaign as React.Dispatch<React.SetStateAction<Campaign>>
              }
            />
            <AccordionItemTime
              campaign={campaign as Campaign}
              setCampaign={
                setCampaign as React.Dispatch<React.SetStateAction<Campaign>>
              }
            />
            <AccordionItemContent
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
              disabled={isPending || !isAbleToSend()}
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
