import { NextResponse } from "next/server";

let goals = [];

export async function GET() {
  return NextResponse.json(goals);
}

export async function POST(request) {
  const body = await request.json();

  const newGoal = {
    id: Date.now().toString(),
    title: body.title,
    targetDate: body.targetDate || null,
    completed: false,
  };

  goals.push(newGoal);
  return NextResponse.json(newGoal, { status: 201 });
}

export async function PATCH(request) {
  const { id } = await request.json();

  goals = goals.map(goal =>
    goal.id === id ? { ...goal, completed: !goal.completed } : goal
  );

  return NextResponse.json({ success: true });
}

export async function DELETE(request) {
  const { id } = await request.json();
  goals = goals.filter(g => g.id !== id);
  return NextResponse.json({ success: true });
}
