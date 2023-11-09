"use client";
import React, { useEffect, useRef, useState } from "react";
import Tab from "@/components/tab/Tab";
import { Post } from "@/types/posts";
import Link from "next/link";
import { BsFillPlayFill } from "react-icons/bs";

interface IUserProfile {
  userProfile: {
    users: any[];
    userPosts: any[];
    userLikes: any[];
  };
}

const ProfilePosts = ({ data }: { data: any }) => {
  const [userProfile, setProfile] = useState<any>(null);
  const [isLoading, setLoaading] = useState(true);

  const [tab, setTab] = useState(true);
  const [hover, setHoverTab] = useState(false);
  const [isAutoPlay, setAutoPlay] = useState(false);
  const controlRef = useRef<HTMLVideoElement | null>(null);

  const handleHover = () => {
    if (isAutoPlay) {
      setAutoPlay(true);
      // controlRef.current?.play();
    } else {
      setAutoPlay(false);
      // controlRef.current?.pause();
    }
  };

  useEffect(() => {
    setProfile(data);
  }, []);
  return (
    <>
      <Tab tab={tab} setTab={setTab} text1="Videos" text2="Liked" />
      <div className="flex w-[calc(100vw-80px)] md:w-[calc(100vw-100px)] lg:w-full flex-wrap gap-4 justify-start items-center">
        {tab ? (
          <>
            {userProfile?.userPosts?.length > 0 ? (
              userProfile?.userPosts?.map((post: Post, index: number) => {
                return (
                  <div
                    key={index}
                    className=" relative bg-gray-200 w-full md:w-[200px] h-[250px] rounded-md"
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
              <h1 className="text-xl text-center md:text-2xl font-medium">
                No posts yet! {":("}
              </h1>
            )}
          </>
        ) : (
          <>
            {userProfile?.userLikes?.length > 0 ? (
              userProfile?.userLikes?.map((post: Post, index: number) => {
                return (
                  <div
                    key={index}
                    className=" relative bg-gray-200 w-full md:w-[200px] h-[250px] rounded-md"
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
              <h1 className="text-xl text-center md:text-2xl font-medium">
                No posts liked yet! {":("}
              </h1>
            )}
          </>
        )}
      </div>
    </>
  );
};

export default ProfilePosts;
