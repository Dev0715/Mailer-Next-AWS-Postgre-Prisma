import { NextRequest } from "next/server";

type Params = {
  campaignId: string;
  subscriberEmail: string;
};

export const POST = async (request: NextRequest, params: Params) => {};
