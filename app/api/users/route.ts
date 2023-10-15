import { client } from "@/sanity/lib/client";
import { NextResponse, NextRequest } from "next/server";

export async function POST(req: NextRequest) {
  const res = await client.fetch(`*[_type == user]`);
  return new Response(JSON.stringify(res));
}
