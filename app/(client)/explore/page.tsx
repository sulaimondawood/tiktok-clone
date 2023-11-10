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
import { register } from "swiper/element/bundle";
import { CustomSwiper } from "@/components/swiper/CustomSwiper";
import { URL } from "@/utils/constants/getUsers";

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
    setLoading(true);
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
      setPosts(res);
    } else {
      const res = await fetch(`${URL}/api/all-posts`, {
        cache: "no-store",
      });
      const data = await res.json();
      setPosts(data);
    }
    setLoading(false);
    console.log("Loading");
    console.log(isLoading);
    console.log("Loading");
  }
  useEffect(() => {
    getTopicPosts();
  }, [topic]);

  return (
    // <main className="w-[calc(100vw-60px)] ml-[60px] sm:w-[calc(100vw-80px)] sm:ml-[80px] lg:w-[calc(100vw-280px)]  lg:ml-[250px] px-4 sm:px-8 overflow-hidden pb-6">
    <main className="w-[calc(100vw-60px)] ml-[60px] sm:w-[calc(100vw-80px)] sm:ml-[80px] lg:w-[calc(100vw-280px)]  md:ml-0 px-4 sm:px-8 overflow-hidden pb-6">
      <CustomSwiper handleQuery={handleQuery} />
      <div className="flex gap-10 w-full flex-wrap items-start justify-center ">
        {isLoading ? (
          [1, 2, 3, 4, 5, 6].map((item, index) => {
            return <ExploreSkeleton key={index} />;
          })
        ) : posts.length >= 1 ? (
          posts.map((post: Post, index) => {
            return (
              <div
                key={index}
                className="flex gap-3 flex-col items-start justify-start"
              >
                <div className=" relative bg-black w-full h-[350px]  sm:w-[300px]  sm:h-[400px] rounded-md">
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
                <p className="w-full sm:w-[300px]">
                  <span className="font-semibold ">
                    {truncateText(post?.caption, 35, 34, false)}
                  </span>
                  <span className="pl-2 uppercase text-blue-600 underline">
                    {post?.topic}
                  </span>
                </p>
                <Link
                  href={`/profile/${post?.userPosted?._id}`}
                  key={index}
                  className="flex items-center gap-4"
                >
                  <img
                    className="w-10 h-10 rounded-full"
                    src={post?.userPosted?.image}
                    alt="user image"
                  />

                  <p className="font-semibold">
                    {post?.userPosted?.userName
                      .replaceAll(" ", "")
                      .toLowerCase()}
                  </p>
                </Link>
              </div>
            );
          })
        ) : (
          <h1 className="text-center text-xl md:text-3xl font-medium text-black">
            Oopps no videos yets!
          </h1>
        )}
      </div>
    </main>
  );
}
