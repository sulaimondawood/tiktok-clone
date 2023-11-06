import { client } from "@/sanity/lib/client";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const query = `*[_type == "post" && _id == "${params.id}"]{
    _id,
     caption,
       video{
        asset->{
          _id,
          url
        }
      },
      userId,
      userPosted->,
    likes,
    comments
  } `;

  const response = await client.fetch(query);
  return new Response(JSON.stringify(response));
  // return NextResponse.json(response);
}
