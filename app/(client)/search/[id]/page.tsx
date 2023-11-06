"use client";

import { ProfileSkeleton } from "@/components/skeletons/Skeleton";
import Tab from "@/components/tab/Tab";
import { client } from "@/sanity/lib/client";
import { Post } from "@/types/posts";
import { URL } from "@/utils/constants/getUsers";
import Link from "next/link";
import React, { useState, useEffect, useRef } from "react";
import { BsFillPlayFill } from "react-icons/bs";

const Search = async ({ params }: { params: { id: string } }) => {
  const [tab, setTab] = useState(true);
  const [isLoading, setLoading] = useState(true);
  const [data, setData] = useState<any>([]);
  const [isAutoPlay, setAutoPlay] = useState(false);
  const controlRef = useRef<HTMLVideoElement | null>(null);

  async function getData(slug: string) {
    const query = `*[ _type == 'post' && caption match "${params.id}*"] || topic match "${params.id}*" {
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
topic,
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

    const query3 = `*[_type == "user" && userName match "${params.id}*"]`;
    const users = await client.fetch(query3);
    const userPosts = await client.fetch(query);
    setData({
      users,
      userPosts,
    });
    setLoading(false);
  }

  useEffect(() => {
    getData(params.id);
  }, []);

  return (
    <div className="w-[calc(100vw-80px)]  max-w-[calc(100vw-280px)] mx-auto ml-[60px] sm:ml-[80px] md:ml-[100px]  lg:ml-[250px] px-4 md:px-8 lg:px-10">
      <Tab tab={tab} setTab={setTab} text1="Videos" text2="Accounts" />

      <div className="flex flex-wrap gap-4 justify-start items-center">
        {isLoading ? (
          [1, 2, 3, 4, 5, 6].map((item, index) => (
            <ProfileSkeleton key={index} />
          ))
        ) : tab ? (
          <>
            {data?.userPosts?.length > 0 ? (
              data?.userPosts?.map((post: Post, index: number) => {
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
              })
            ) : (
              <h1 className="text-lg md:text-2xl font-medium">
                No videos found!
              </h1>
            )}
          </>
        ) : (
          <>
            {data?.users?.length > 0 ? (
              data?.users?.map((user: userType, index: number) => {
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
              })
            ) : (
              <h1 className="text-xl md:text-2xl font-medium">
                No users found! {"):"}
              </h1>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default Search;
