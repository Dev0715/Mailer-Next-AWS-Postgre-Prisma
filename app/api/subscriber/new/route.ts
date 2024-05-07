import { NextRequest, NextResponse } from "next/server";
import bodyParser from "body-parser";

// ## http://localhost:3000/api/subscriber/new

export const POST = async (request: NextRequest) => {
  console.log("POST /api/subscriber/new");
  const data = request.body;
  const jsonParser = bodyParser.json();
  jsonParser(request, null);
  console.log(_data);

  // if (campaign === null) {
  //   return NextResponse.json({ error: "Campaign not found" }, { status: 404 });
  // }

  // if (isAlreadyOpened) {
  //   return NextResponse.json(
  //     { error: "Email was already regitered as opened" },
  //     { status: 404 }
  //   );
  // }

  // if (res.success) {
  //   return NextResponse.json({ success: true });
  // } else {
  return NextResponse.json(
    { error: "Failed to update campaign" },
    { status: 500 }
  );
  // }
};
