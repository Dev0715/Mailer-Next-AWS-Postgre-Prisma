import { NextRequest, NextResponse } from "next/server";

// ## http://localhost:3000/api/subscriber/new
export const POST = async (request: NextRequest) => {
  const data = await request.json();
  console.log(data);

  return NextResponse.json({ message: "Subscriber added" });
};
