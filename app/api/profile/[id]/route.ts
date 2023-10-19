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
  console.log(params.id);

//   const query = `*[_type == "post" && _id == "${params.id}"]{
//     _id,
//      caption,
//        video{
//         asset->{
//           _id,
//           url
//         }
//       },
//       userId,
//       userPosted->,
//     likes,
//     comments
//   } `;
 
    const query = `*[ _type == 'post' && userId == '${params.id}'] | order(_createdAt desc){
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





    const query2 = `*[_type == 'post' && '${params.id}' in likes[]._ref ] | order(_createdAt desc) {
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

  const query3=  `*[_type == "user" && _id == '${params.id}']`;

  


  const user = await client.fetch(query3);
  const userPosts = await client.fetch(query);
  const userLikes = await client.fetch(query2);

  return new Response(JSON.stringify({
    user,userPosts,userLikes
  }));
  
}
