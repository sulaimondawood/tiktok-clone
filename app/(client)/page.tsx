"use client";
import { VideoSkeleton } from "@/components/skeletons/Skeleton";
import VideoCard from "@/components/videocard/VideoCard";
import { client } from "@/sanity/lib/client";
import { Post } from "@/types/posts";
import { useEffect, useState } from "react";

export default async function Home() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [allPosts, setAllPosts] = useState<any>([]);
  useEffect(() => {
    async function fetchPosts() {
      try {
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
        console.log(res);
        console.log("test");
        await Promise.resolve();
        console.log("test");
        setPosts(res);
        console.log(posts);
        console.log("all posts");
        setAllPosts(res);
        console.log("all posts");
      } catch (error) {
        console.error("Error fetching posts:", error);
      } finally {
        setLoading(false);
      }
    }
    fetchPosts();
  }, []);

  return (
    <main className="w-full px-3 md:px-0 max-w-3xl  mx-auto ml-[60px] sm:ml-[80px] md:ml-[100px] lg:ml-[270px] xl:ml-[370px]">
      {loading
        ? [1, 2, 3, 4, 5].map((item, index) => {
            return <VideoSkeleton key={index} />;
          })
        : posts.map((data: Post, index: any) => {
            return <VideoCard key={index} post={data} />;
          })}
    </main>
  );
}
