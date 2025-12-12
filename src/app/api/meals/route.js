import { NextResponse } from "next/server";

export async function GET() {
  return NextResponse.json({ message: "GET /api/meals not implemented yet" });
}

export async function POST(request) {
  const body = await request.json();
  return NextResponse.json({
    message: "POST /api/meals not implemented yet",
    received: body,
  });
}
