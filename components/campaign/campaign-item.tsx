import { Button } from "@/components/ui/button";
import { Campaign } from "@/shared/types/campaign";
import Link from "next/link";
import { useState, useTransition } from "react";
import { FaEdit, FaMailBulk, FaTrash } from "react-icons/fa";
import { ConfirmAlert } from "../utils/confirm-alert";
import { useCurrentUser } from "@/hooks/use-current-user";
import { deleteCampaign } from "@/data/campaign/campaign-delete";
import { toast } from "sonner";
import { Spinner } from "@nextui-org/spinner";
import { DetailShowItem } from "./campaign-detail-item";
import { CampaignStateBadge } from "./campaign-state-badge";

type Props = {
  campaign: Campaign;
  onRemove: () => void;
};

const CampaignItem = ({ campaign, onRemove }: Props) => {
  const user = useCurrentUser();

  const [isPending, startTransition] = useTransition();
  const [confirmAlert, setConfirmAlert] = useState(false);

  const onConfirmAlertClosed = () => {
    // # Need to Stop Trigger? #
    setConfirmAlert(false);
    startTransition(() => {
      deleteCampaign(user?.email as string, campaign.campaignId)
        .then((response) => {
          if (response.success) {
            onRemove();
          } else {
            toast.error("Failed to remove campaign");
          }
        })
        .catch(() => {
          toast.error("Failed to remove campaign");
        });
    });
  };

  return (
    <div className="w-full flex gap-x-6">
      <ConfirmAlert
        open={confirmAlert}
        title="Remove Campaign"
        description="Are you sure you want to remove this campaign?"
        onAlertDialogClosed={onConfirmAlertClosed}
      />
      <div className="w-3/6 flex gap-x-8">
        <FaMailBulk className="text-4xl text-yellow-700" />
        <div className="flex flex-col gap-y-1 text-gray-500">
          <Button variant={"link"} className="px-0 justify-start">
            <Link href={`/campaign/details/${campaign.campaignId}`}>
              <p className="text-xl text-blue-500">{campaign.title}</p>
            </Link>
          </Button>
          <DetailShowItem title="Subject" content={campaign.subject?.subject} />
          <DetailShowItem title="To" content={campaign.to?.segmentTitle} />
          <DetailShowItem
            title="Edited"
            content={`${campaign.lastUpdated?.toDateString()} ${campaign.lastUpdated?.toLocaleTimeString()}`}
          />
        </div>
      </div>
      <div className="w-1/6 flex flex-col items-center gap-y-4">
        <DetailShowItem
          title="Subscribers"
          content={campaign.to?.totalNumber}
        />
        <CampaignStateBadge state={campaign.state} />
      </div>
      <div className="w-1/6 flex flex-col items-center gap-y-4">
        <DetailShowItem
          title="Opened"
          content={campaign.openedEmails?.length}
        />
        <DetailShowItem
          title="Bounced"
          content={campaign.bouncedEmails?.length}
        />
        <DetailShowItem
          title="Unsubscribed"
          content={campaign.unsubEmails?.length}
        />
      </div>
      <div className="w-1/6 flex flex-col items-center gap-y-4">
        <Button
          disabled={isPending || campaign.state !== "draft"}
          className="w-fit flex rounded-none"
        >
          <Link
            href={`/campaign/edit-campaign/${campaign.campaignId}`}
            className="flex items-center gap-x-2"
          >
            <FaEdit />
            Edit
          </Link>
        </Button>
        <Button
          disabled={isPending}
          variant={"destructive"}
          className="w-fit flex gap-x-2 rounded-none"
          onClick={() => setConfirmAlert(true)}
        >
          {isPending ? <Spinner size="sm" /> : <FaTrash />}
          Remove
        </Button>
      </div>
    </div>
  );
};

export default CampaignItem;
