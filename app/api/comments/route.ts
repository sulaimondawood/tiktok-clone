import { client } from "@/sanity/lib/client";
import { NextResponse, NextRequest } from "next/server";
import { v4 as uuidv4 } from "uuid";

export async function PUT(req: NextRequest) {
  const data = await req.json();
  const { postID, userID, comment } = data;

  console.log("COmment");
  console.log(postID);
  console.log(userID);
  console.log(comment);

  const response = await client
    .patch(postID)
    .setIfMissing({ comments: [] })
    .insert("after", "comments[-1]", [
      {
        _key: uuidv4(),
        comment,
        userPosted: { _type: "userPosted", _ref: userID },
      },
    ])
    .commit();

  return new Response(JSON.stringify(response));
}
