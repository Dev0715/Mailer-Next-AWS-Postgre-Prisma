import { CampaignState } from "@/shared/types/campaign";

const CLASS_NAME_Text: Record<CampaignState, string> = {
  draft: "bg-gray-500",
  scheduled: "bg-blue-500",
  sending: "bg-sky-500",
  sent: "bg-green-500",
  failed: "bg-red-500"
};

export const StateBadge = ({ state }: { state: CampaignState }) => {
  return (
    <span
      className={`w-fit px-4 py-1 text-sm text-white capitalize font-normal ${CLASS_NAME_Text[state]}`}
    >
      {state}
    </span>
  );
};
