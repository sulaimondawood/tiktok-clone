import VideoCard from "@/components/videocard/VideoCard";
import { client } from "@/sanity/lib/client";
import React from "react";

async function getData() {
  const query = `*[_type == "post"] {
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
    topic
  } `;
  return await client.fetch(query);
}

const Following = async () => {
  const data = await getData();

  return (
    <main className="w-full max-w-3xl  mx-auto ml-[370px]">
      {data.map((data: any, index: any) => {
        return (
          <div key={index}>
            <VideoCard post={data} />
          </div>
        );
      })}
    </main>
  );
};

export default Following;
