import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Campaign } from "@/shared/campaign-type";
import Link from "next/link";
import { FaEdit, FaMailBulk } from "react-icons/fa";

type Props = {
  campaign: Campaign;
};

const CampaignItem = ({ campaign }: Props) => {
  return (
    <div className="w-full flex justify-between">
      <div className="flex gap-x-8">
        <FaMailBulk className="text-4xl text-yellow-700" />
        <div className="flex flex-col gap-y-0 text-gray-500">
          <p className="text-xl text-blue-500">{campaign.title}</p>
          <p className="text-base">Subject · {campaign.subject?.subject}</p>
          <p className="text-base">To · {campaign.to}</p>
          <p className="text-base">Edited · </p>
        </div>
      </div>
      <div className="flex flex-col gap-y-2">
        <Badge
          variant={"success"}
          className="w-fit text-base font-normal text-black text-center"
        >
          Draft
        </Badge>
        <Badge className="text-base font-normal text-black text-center">
          New Builder
        </Badge>
      </div>
      <div className="flex flex-col">
        <Button asChild className="flex gap-x-2 w-32 text-black bg-green-500">
          <Link href={`/campaign/edit-campaign/${campaign.campaignId}`}>
            <FaEdit />
            Edit
          </Link>
        </Button>
      </div>
    </div>
  );
};

export default CampaignItem;
