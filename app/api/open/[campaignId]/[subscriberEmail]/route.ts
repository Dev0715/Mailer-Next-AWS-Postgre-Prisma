import { NextRequest } from "next/server";

type Params = {
  campaignId: string;
  subscriberEmail: string;
};

// ## http://localhost:3000/api/open/id/mail
export const POST = async (request: NextRequest, params: Params) => {
  console.log("Request", request);
  console.log("Params", params);
};
