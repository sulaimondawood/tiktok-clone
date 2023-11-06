"use client";

import { VideoSkeleton } from "@/components/skeletons/Skeleton";
import VideoCard from "@/components/videocard/VideoCard";
import { client } from "@/sanity/lib/client";
import { Post } from "@/types/posts";
import { URL } from "@/utils/constants/getUsers";
import { useEffect, useState } from "react";

export default async function Page() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  async function getPosts() {
    const query = `*[_type == "post"] | order(_createdAt desc){
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

    const res = await client.fetch(query);

    setPosts(res);
    setLoading(false);
  }
  useEffect(() => {
    getPosts();
  }, []);
  return (
    <main className="w-full px-3 md:px-0 max-w-3xl  mx-auto ml-[60px] sm:ml-[80px] md:ml-[100px] lg:ml-[270px] xl:ml-[370px]">
      {loading
        ? [1, 2, 3, 4, 5].map((item, index) => {
            return <VideoSkeleton key={index} />;
          })
        : posts.map((data: any, index: any) => {
            return <VideoCard key={index} post={data} />;
          })}
      {/* {} */}
    </main>
  );
}
