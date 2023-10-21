"use client";
import React, { useEffect, useState } from "react";
import Header from "@/components/explore-header/Header";
import axios from "axios";
import { client } from "@/sanity/lib/client";
import { Post } from "@/types/posts";
import Link from "next/link";

export default function Explore() {
  const [topic, setTopic] = useState("");
  const [posts, setPosts] = useState([]);
  const [isLoading, setLoading] = useState(true);
  const [isAutoPlay, setAutoPlay] = useState(false);

  async function getTopicPosts() {
    const query = `*[_type == "post" && topic match '${topic}*'] {
    _id,
     caption,
       video{
        asset->{
          _id,
          url
        }
      },
      userId,
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

    const res = await client.fetch(query);
    console.log(res);
    setPosts(res);
    setLoading(false);
  }
  useEffect(() => {
    getTopicPosts();
  }, [topic]);

  return (
    <main className="w-[calc(100vw-250px)] ml-[250px] px-8">
      <div className="">
        <Header setTopic={setTopic} />
      </div>
      <div className="">
        {isLoading
          ? "loading"
          : posts.map((post: Post, index) => {
              return (
                <>
                  <div
                    key={index}
                    className=" relative bg-black w-[400px] h-[350px] rounded-md"
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
                </>
              );
            })}
      </div>
    </main>
  );
}
