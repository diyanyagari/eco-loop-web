import { NextResponse } from "next/server";
import dataActivity from "./activity.json";

export async function POST(req: Request) {
  const { type } = await req.json();

  const isSuccess = type !== "battery";

  return NextResponse.json({
    status: isSuccess ? "success" : "failed",
    message: isSuccess
      ? `Item '${type}' recycled successfully.`
      : `Item '${type}' failed to scan.`,
    points: isSuccess ? 30 : 0,
  });
}

export function GET() {
  // return NextResponse.json({ error: "Method not allowed" }, { status: 405 });
  return NextResponse.json({
    success: true,
    message: "Activities retrieved successfully",
    offset: 0,
    totalItems: 2,
    itemsPerPage: 10,
    data: dataActivity,
  });
}
