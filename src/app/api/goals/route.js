import { NextResponse } from "next/server";

export async function GET() {
  return NextResponse.json({ message: "GET /api/goals not implemented yet" });
}

export async function POST(request) {
  const body = await request.json();
  return NextResponse.json({
    message: "POST /api/goals not implemented yet",
    received: body,
  });
}
