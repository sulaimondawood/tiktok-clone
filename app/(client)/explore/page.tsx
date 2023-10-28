"use client";
import React, { useEffect, useState } from "react";
import Header from "@/components/explore-header/Header";
import axios from "axios";
import { client } from "@/sanity/lib/client";
import { Post } from "@/types/posts";
import Link from "next/link";
import { truncateText } from "@/utils/constants/truncate";
import topics from "@/utils/constants/topics";
import { useParams, useRouter, useSearchParams } from "next/navigation";
import { ExploreSkeleton } from "@/components/skeletons/Skeleton";

export default function Explore() {
  const [topic, setTopic] = useState("");
  const [posts, setPosts] = useState([]);
  const [isLoading, setLoading] = useState(true);
  const [isAutoPlay, setAutoPlay] = useState(false);

  const [isActive, setActive] = useState(false);
  const router = useSearchParams();
  console.log(router.get("topic"));

  const handleQuery = (topic: string) => {
    setTopic(topic);
  };
  // console.log(topic)

  async function getTopicPosts() {
    const query = `*[_type == "post" && topic match "${topic}"] {
    _id,
     caption,
       video{
        asset->{
          _id,
          url
        }
      },
      userId,
      topic,
    postedBy->{
      _id,
      userName,
      image
    },
 likes,

    comments[]{
      comment,
      _key,
      postedBy->{
      _id,
      userName,
      image
    },
    }
  }
  `;

    if (topic) {
      const res = await client.fetch(query);
      console.log(res);
      setPosts(res);
    } else {
      const res = await fetch("http://localhost:3000/api/getData");
      const data = await res.json();
      setPosts(data);
    }
    setLoading(false);
  }
  useEffect(() => {
    getTopicPosts();
  }, [topic]);

  return (
    <main className="w-[calc(100vw-280px)] ml-[250px] px-8 overflow-hidden">
      <div className="my-6 flex gap-4 items-center justify-center">
        <Link
          onClick={() => handleQuery("")}
          href={`/explore/?topic=${""}`}
          className={`${
            router.get("topic") === "" || !router.get("topic")
              ? "bg-black text-white"
              : "text-black bg-gray-100"
          } px-4 py-2 rounded-md`}
        >
          All
        </Link>
        {topics.map((topic: { id: number; name: string }) => {
          return (
            <Link
              onClick={() => handleQuery(topic.name)}
              href={`/explore/?topic=${topic.name}`}
              key={topic.id}
              className={`${
                router.get("topic") === topic.name
                  ? "bg-black text-white"
                  : "text-black bg-gray-100"
              }  px-4 py-2 rounded-md`}
            >
              {topic.name}
            </Link>
          );
        })}
      </div>
      <div className="flex gap-10 flex-wrap items-center ">
        {isLoading ? (
          [1, 2, 3, 4, 5, 6].map((item, index) => {
            return <ExploreSkeleton key={index} />;
          })
        ) : posts.length >= 1 ? (
          posts.map((post: Post, index) => {
            return (
              <div className="flex gap-4 flex-col items-start justify-start">
                <div
                  key={index}
                  className=" relative bg-black w-[300px] h-[400px] rounded-md"
                >
                  <Link
                    href={`/${post?.userPosted?.userName}/post/${post._id}`}
                  >
                    <video
                      onMouseEnter={() => setAutoPlay(true)}
                      onMouseLeave={() => setAutoPlay(false)}
                      className="w-full h-full"
                      autoPlay={isAutoPlay}
                      loop
                      muted
                    >
                      <source src={post?.video?.asset?.url}></source>
                      Your browser does not support this video
                    </video>
                  </Link>
                </div>
                <p className="w-[300px]">
                  <span className="font-semibold ">
                    {truncateText(post?.caption, 35, 34, false)}
                  </span>
                  <span className="pl-2 uppercase text-blue-600 underline">
                    {post?.topic}
                  </span>
                </p>
              </div>
            );
          })
        ) : (
          <h1 className="text-center text-3xl font-medium text-black">
            Oopps no videos yets!
          </h1>
        )}
      </div>
    </main>
  );
}