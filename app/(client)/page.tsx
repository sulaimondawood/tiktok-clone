import { VideoSkeleton } from "@/components/skeletons/Skeleton";
import VideoCard from "@/components/videocard/VideoCard";
import { client } from "@/sanity/lib/client";
import { Post } from "@/types/posts";
import { URL } from "@/utils/constants/getUsers";
import { Suspense } from "react";
import { useEffect, useState } from "react";
async function getPosts() {
  const res = await fetch(`${URL}/api/all-posts`, {
    cache: "no-store",
  });
  return res.json();
}

export default async function Home() {
  const posts = await getPosts();

  return (
    <>
      <Suspense fallback={<VideoSkeleton />}>
        <main className="w-full px-3 md:px-0 max-w-3xl  mx-auto ml-[60px] sm:ml-[80px] md:ml-0">
          {/* <main className="w-full px-3 md:px-0 max-w-2xl  mx-auto ml-[60px] sm:ml-[80px] md:ml-[100px] lg:ml-[270px] xl:ml-[370px]"> */}
          {posts.map((item: Post, index: number) => {
            return <VideoCard key={index} post={item} />;
          })}
        </main>
      </Suspense>
    </>
  );
}
