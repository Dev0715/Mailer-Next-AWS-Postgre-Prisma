import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Campaign } from "@/shared/campaign-type";
import Link from "next/link";
import { useEffect, useState, useTransition } from "react";
import { FaEdit, FaMailBulk, FaRemoveFormat, FaTrash } from "react-icons/fa";
import { ConfirmAlert } from "../utils/confirm-alert";
import { useCurrentUser } from "@/hooks/use-current-user";
import { deleteCampaign } from "@/data/campaign/delete-campaign";
import { toast } from "sonner";
import { Spinner } from "@nextui-org/spinner";

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
        <div className="flex flex-col gap-y-0 text-gray-500">
          <p className="text-xl text-blue-500">{campaign.title}</p>
          <p className="text-base">Subject · {campaign.subject?.subject}</p>
          <p className="text-base">
            To ·{" "}
            <span className="text-black font-bold">
              {campaign.to?.segmentTitle}
            </span>
          </p>
          <p className="text-base">Edited · </p>
        </div>
      </div>
      <div className="w-1/6 flex flex-col items-center gap-y-2">
        <Badge
          variant={"success"}
          className="w-fit text-sm font-normal text-black text-center"
        >
          Draft
        </Badge>
        <Badge className="text-sm font-normal text-black text-center">
          Sending
        </Badge>
      </div>
      <div className="w-1/6 flex flex-col items-center gap-y-2">
        <Badge
          variant={"secondary"}
          className="text-sm font-normal text-black text-center"
        >
          Opened: 0
        </Badge>
        <Badge
          variant={"secondary"}
          className="text-sm font-normal text-black text-center"
        >
          Bounced: 0
        </Badge>
        <Badge
          variant={"secondary"}
          className="text-sm font-normal text-black text-center"
        >
          Unsubscribed: 0
        </Badge>
      </div>
      <div className="w-1/6 flex flex-col items-center gap-y-2">
        <Button disabled={isPending} className="w-fit flex">
          <Link
            href={`/campaign/edit-campaign/${campaign.campaignId}`}
            className="flex items-center gap-x-2 text-black"
          >
            <FaEdit />
            Edit
          </Link>
        </Button>
        <Button
          disabled={isPending}
          variant={"destructive"}
          className="w-fit flex gap-x-2 text-black"
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
