"use client";

import { Post } from "@/types/posts";
import axios from "axios";
import Link from "next/link";
import { useParams, usePathname } from "next/navigation";
import React, { useEffect, useRef, useState } from "react";
import { BsFillPlayFill } from "react-icons/bs";
interface IUserProfile {
  userProfile: {
    users: any[];
    userPosts: any[];
    userLikes: any[];
  };
}

const page = () => {
  const [userProfile, setProfile] = useState<any>(null);
  const [isLoading, setLoaading] = useState(true);
  const params = useParams();
  const [tab, setTab] = useState(true);
  const [hover, setHoverTab] = useState(false);
  const [isAutoPlay, setAutoPlay] = useState(false);
  const controlRef = useRef<HTMLVideoElement | null>(null);
  // console.log(params);

  async function getProfileData() {
    const response = await axios.get(
      `http://localhost:3000/api/profile/${params.id}`
    );
    console.log(response);
    setProfile(response.data);
    setLoaading(false);
  }

  const handleTabClick = () => {
    if (tab) {
      setTab(false);
    } else {
      setTab(true);
      setHoverTab(false);
    }
  };
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
    getProfileData();
  }, []);

  return (
    <div className="w-[calc(100vw-250px)] ml-[250px] px-8">
      {isLoading ? (
        "loading"
      ) : (
        <div className="flex mt-8 gap-4 items-start">
          <img
            className="rounded-full w-24 h-24"
            src={userProfile?.user[0]?.image}
            alt="user image"
          />
          <div className="flex flex-col gap-1">
            <h1 className="font-semibold text-2xl">
              {userProfile?.user[0]?.userName.replaceAll(" ", "").toLowerCase()}
            </h1>
            <p className="text-gray-600 ">{userProfile?.user[0]?.userName} </p>
          </div>
        </div>
      )}

      <div className="w-full border-b my-6 border-b-gray-200">
        <div className="flex w-80 items-center py-3 relative">
          <button
            onClick={() => setTab(true)}
            className={`w-1/2 text-lg ${tab ? "text-black" : "text-gray-600"}  
            `}
          >
            Videos
          </button>
          <button
            onClick={() => setTab(false)}
            className={`w-1/2 text-lg  ${
              tab ? "text-gray-600" : "text-black"
            } font-semibold
          
            `}
          >
            Liked
          </button>
          <div
            className={`absolute w-1/2 h-[2px] left-0 bg-black bottom-0 ${
              tab ? " translate-x-0" : "translate-x-full"
            } 

            font-semibold 
            transition-all duration-300 ease-in-out`}
          ></div>
        </div>
      </div>
      <div className="flex gap-4 justify-start items-center">
        {isLoading ? (
          "loading"
        ) : tab ? (
          <>
            {userProfile?.userPosts?.map((post: Post, index: number) => {
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
            {userProfile?.userLikes?.map((post: Post, index: number) => {
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
        )}
      </div>
    </div>
  );
};

export default page;
