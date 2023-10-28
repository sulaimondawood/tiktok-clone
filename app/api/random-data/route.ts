import { client } from "@/sanity/lib/client";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest, res: NextResponse) {
  const query = `*[_type == "post"]{
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
 
    },
    topic
    
  } `;

  const response = await client.fetch(query);
  return new Response(JSON.stringify(response));
}
