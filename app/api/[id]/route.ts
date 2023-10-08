import { client } from "@/sanity/lib/client";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  // const { searchParams } = new URL(req.url);
  // const id = searchParams.get("id");
  console.log("details");
  console.log(params);
  console.log("details");

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
    comments[]{
      comment,
      _key,
 
    }
  } `;

  const response = await client.fetch(query);
  return new Response(JSON.stringify(response));
  // return NextResponse.json(response);
}
