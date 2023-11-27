import { NextResponse } from "next/server";
import data from "@/db/user.json";

export async function GET(request: Request) {
  const response = new Response(JSON.stringify({ data }));
  return response;
}
