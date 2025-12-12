import { NextResponse } from "next/server";

export async function GET() {
  return NextResponse.json({ message: "GET /api/workouts not implemented yet" });
}

export async function POST(request) {
  const body = await request.json();
  return NextResponse.json({
    message: "POST /api/workouts not implemented yet",
    received: body,
  });
}
