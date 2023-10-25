"use client";

import Tab from "@/components/tab/Tab";
import { Post } from "@/types/posts";
import Link from "next/link";
import React, { useState, useEffect, useRef } from "react";
import { BsFillPlayFill } from "react-icons/bs";

const Page = async ({ params }: { params: { id: string } }) => {
  const [tab, setTab] = useState(true);
  const [isLoading, setLoading] = useState(true);
  const [data, setData] = useState<any>([]);
  const [isAutoPlay, setAutoPlay] = useState(false);
  const controlRef = useRef<HTMLVideoElement | null>(null);
  async function getData(slug: string) {
    const res = await fetch(`http://localhost:3000/api/search/${slug}`);
    const data = await res.json();
    setData(data);
    setLoading(false);
  }

  useEffect(() => {
    getData(params.id);
  }, []);

  return (
    <div className="w-[calc(100vw-250px)] ml-[250px] px-10">
      <Tab tab={tab} setTab={setTab} text1="Videos" text2="Accounts" />
      <>
        <div className="flex flex-wrap gap-4 justify-start items-center">
          {isLoading ? (
            "loading"
          ) : tab ? (
            <>
              {data?.userPosts?.map((post: Post, index: number) => {
                return (
                  <div
                    key={index}
                    className=" relative bg-gray-200 w-[200px] h-[250px] rounded-md"
                  >
                    <Link
                      href={`/${post?.userPosted?.userName}/post/${post._id}`}
                    >
                      <video
                        onMouseEnter={() => setAutoPlay(true)}
                        onMouseLeave={() => setAutoPlay(false)}
                        ref={controlRef}
                        className="w-full h-full"
                        autoPlay={isAutoPlay}
                        loop
                        muted
                      >
                        <source src={post?.video?.asset?.url}></source>
                        Your browser does not support this video
                      </video>
                    </Link>
                    <span className="absolute bottom-3 text-white text-xl z-50  left-4">
                      <BsFillPlayFill />
                    </span>
                  </div>
                );
              })}
            </>
          ) : (
            <>
              {data?.users?.map((user: userType, index: number) => {
                return (
                  <Link
                    href={`/profile/${user._id}`}
                    key={index}
                    className="flex item-center gap-4"
                  >
                    <img
                      className="w-10 h-10 rounded-full"
                      src={user.image}
                      alt="user image"
                    />
                    <div className="">
                      <p className="font-semibold">
                        {user.userName.replaceAll(" ", "").toLowerCase()}
                      </p>
                      <p className="text-xs text-gray-500">{user.userName}</p>
                    </div>
                  </Link>
                );
              })}
            </>
          )}
        </div>
      </>
    </div>
  );
};

export default Page;
