import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { FaEdit, FaMailBulk, FaMailchimp, FaVoicemail } from "react-icons/fa";

const CampaignItem = () => {
  return (
    <div className="w-full flex justify-between">
      <div className="flex gap-x-8">
        <FaMailBulk className="text-4xl text-yellow-700" />
        <div className="flex flex-col gap-y-2 text-gray-500">
          <p className="text-xl text-blue-500">Email Title</p>
          <p className="text-base">Regular · Malachi Uy</p>
          <p className="text-base">Tags: Customer</p>
          <p className="text-base">Edited Wed, April 10th 11:25 pm by you</p>
        </div>
      </div>
      <div className="flex flex-col gap-y-2">
        <Badge className="w-fit text-base font-normal text-black text-center bg-gray-200">
          Draft
        </Badge>
        <Badge className="text-base font-normal text-black text-center bg-gray-200">
          New Builder
        </Badge>
      </div>
      <div className="flex flex-col">
        <Button className="flex gap-x-2 w-32 text-black bg-green-500">
          <FaEdit />
          Edit
        </Button>
      </div>
    </div>
  );
};

export default CampaignItem;
