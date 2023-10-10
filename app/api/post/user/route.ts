import { client } from "@/sanity/lib/client";
import { NextResponse, NextRequest } from "next/server";

export async function POST(req: NextRequest, res: NextResponse) {
  try {
    const user = await req.json();
    // console.log("server");
    // console.log(user);
    // console.log("server");
    await client.createIfNotExists(user).then(() =>
      NextResponse.json(
        {
          message: "Login success",
        },
        {
          status: 200,
        }
      )
    );
  } catch (error) {
    console.log(error);
  }

  // return new Response(JSON.stringify(data));
  // client.createIfNotExists(user).then(() =>
  //   NextResponse.json(
  //     {
  //       message: "Successfully logged in",
  //     },
  //     { status: 200 }
  //   )
  // );

  ///

  //   return NextResponse.json(
  //     { message: "Successfully logged in" },
  //     { status: 200 }
  //   );

  ///
}
