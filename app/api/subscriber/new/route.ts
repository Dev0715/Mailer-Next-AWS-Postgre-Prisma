import { getCampaignById } from "@/data/campaign/campaign-by-id";
import { updateCampaignOpened } from "@/data/campaign/campaign-update-opened";
import { NextRequest, NextResponse } from "next/server";

// ## http://localhost:3000/api/subscriber/new

export const POST = async (request: NextRequest) => {
  const data = await request.json();
  console.log(data);

  if (campaign === null) {
    return NextResponse.json({ error: "Campaign not found" }, { status: 404 });
  }

  if (isAlreadyOpened) {
    return NextResponse.json(
      { error: "Email was already regitered as opened" },
      { status: 404 }
    );
  }

  if (res.success) {
    return NextResponse.json({ success: true });
  } else {
    return NextResponse.json(
      { error: "Failed to update campaign" },
      { status: 500 }
    );
  }
};
