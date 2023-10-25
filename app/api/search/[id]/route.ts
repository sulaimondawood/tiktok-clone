import { client } from "@/sanity/lib/client";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  req: NextRequest,
  {
    params,
  }: {
    params: { id: string };
  }
) {
  const query = `*[ _type == 'post' && caption match "${params.id}*"] | topic match "${params.id}*" {
    _id,
     caption,
       video{
        asset->{
          _id,
          url
        }
      },
      userId,
    userPosted->{
      _id,
      userName,
      image
    },
 likes,
topic,
    comments[]{
      comment,
      _key,
      userPosted->{
      _id,
      userName,
      image
    },
    }
  }`;

  const query3 = `*[_type == "user" && _id == '${params.id}']`;

  const users = await client.fetch(query3);
  const userPosts = await client.fetch(query);

  return new Response(
    JSON.stringify({
      users,
      userPosts,
    })
  );
}
