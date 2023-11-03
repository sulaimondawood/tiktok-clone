"use client";

import VideoCard from "@/components/videocard/VideoCard";
import { Post } from "@/types/posts";
import { useEffect, useState } from "react";

export default async function Page() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  async function getPosts() {
    const data = await fetch("http://localhost:3000/api/getData", {
      cache: "no-store",
    });
    const res = await data.json();
    setPosts(res);
    setLoading(false);
  }
  useEffect(() => {}, []);
  return (
    <main className="w-full px-3 md:px-0 max-w-3xl  mx-auto ml-[60px] sm:ml-[80px] md:ml-[100px] lg:ml-[270px] xl:ml-[370px]">
      {loading
        ? "loading"
        : posts.map((data: any, index: any) => {
            return <VideoCard key={index} post={data} />;
          })}
      {/* {} */}
    </main>
  );
}
