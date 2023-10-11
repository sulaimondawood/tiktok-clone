import { client } from "@/sanity/lib/client";
import { NextRequest, NextResponse } from "next/server";
import { json } from "stream/consumers";
import { v4 as uuidv4 } from "uuid";

export async function PUT(req: NextRequest) {
  const { postID, userID, liked } = await req.json();
  console.log(postID);
  console.log(userID);
  console.log("Data from like button");

  if (liked) {
    const response = await client
      .patch(postID)
      .setIfMissing({ likes: [] })
      .insert("after", "likes[-1]", [
        {
          _key: uuidv4(),
          _ref: userID,
        },
      ])
      .commit();

    return new Response(JSON.stringify(response));
  } else {
    const response = await client
      .patch(postID)
      .unset([`likes[_ref=="${userID}"]`])
      .commit();

    return new Response(JSON.stringify(response));
  }
}
