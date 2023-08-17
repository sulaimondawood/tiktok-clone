import { client } from "@/sanity/lib/client";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest, res: NextResponse) {
  const query = `*[_type == "post"] | order(_createdAt desc){
    _id,
     caption,
       video{
        asset{
          _id,
          url
        }
      },
      userId,
      userPosted{
        _id,
        userName,
        image
      },
    likes,
    comments[]{
      comment,
      _key,
      userPosted{
      _id,
      userName,
      image
    },
    }
  } `;

  const ressponse = await client.fetch(query);
  return new Response(ressponse);
}
