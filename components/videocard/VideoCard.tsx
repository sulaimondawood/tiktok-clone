"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import React from "react";
import { Post } from "@/types/posts";
import Link from "next/link";
import {
  BsFillVolumeMuteFill,
  BsFillPlayFill,
  BsFillPauseFill,
  BsFillVolumeUpFill,
} from "react-icons/bs";

import { HiChatBubbleOvalLeftEllipsis } from "react-icons/hi2";

import { urlForImage } from "@/sanity/lib/image";
import LikeButton from "../likeButton/LikeButton";
import { FaCommentDots } from "react-icons/fa";

import {
  FacebookShareButton,
  LinkedinShareButton,
  PinterestShareButton,
  TelegramShareButton,
  TwitterShareButton,
  WhatsappShareButton,
} from "react-share";

import {
  BsFacebook,
  BsTwitter,
  BsTelegram,
  BsWhatsapp,
  BsPinterest,
} from "react-icons/bs";

import { FaTelegram } from "react-icons/fa";
import { IoMdShareAlt } from "react-icons/io";

import useStore from "@/store/userStore/userStore";

interface IPost {
  post: Post;
}

const VideoCard = ({ post }: IPost) => {
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(false);
  const [isShowControl, setIsShowControl] = useState(false);
  const [url, setUrl] = useState<string>("");
  const [viewSocials, setViewSocials] = useState(false);
  const [likes, setLikes] = useState<any>(null);

  const controlRef = useRef<HTMLVideoElement | null>(null);
  console.log("Post video card");
  // console.log(post);

  const handleVideoControl = () => {
    if (isPlaying) {
      controlRef.current!.pause();
      setIsPlaying(false);
    } else {
      controlRef.current!.play();
      setIsPlaying(true);
    }
  };

  const handleVideoVolume = () => {
    if (isMuted) {
      setIsMuted(false);
    } else {
      setIsMuted(true);
    }
  };

  const hoverLeave = () => {
    setTimeout(() => {
      setViewSocials(false);
    }, 3000);
  };

  useEffect(() => {
    setUrl(window.location.href);
  }, []);

  const userProfile = useStore((state) => state.user);

  const handleLike = async (like: boolean, postID: string, postLikes: any) => {
    if (!userProfile) {
      return;
    }

    try {
      const url = "http://localhost:3000/api/post/like";
      const data = {
        userID: userProfile?._id,
        postID,
        liked: like,
      };

      const response = await fetch(url, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error(`Request failed with status: ${response.status}`);
      }

      const responseData = await response.json();
      // setLikes(responseData);
      // setLikes(responseData?.likes);
      console.log(responseData);
      setLikes({ ...post, likes: responseData.likes });
      console.log(likes);
    } catch (error) {
      console.error("Error handling like:", error);
    }
  };

  return (
    <div className="w-full ">
      <div className="border-b border-b-gray-200 py-6 md:py-10 flex items-start justify-between gap-5">
        <div className="flex justify-between items-center ">
          <div className="flex items-start w-full gap-4">
            <img
              className="w-12 h-12 rounded-full"
              src={post?.userPosted?.image}
              alt=""
            />

            <div className="flex flex-col ">
              <p className="font-semibold">{post?.userPosted?.userName}</p>
              <p className="text-sm mb-4">{post?.caption}</p>

              <div className="flex justify-end items-end gap-5">
                <div
                  onMouseEnter={() => setIsShowControl(true)}
                  onMouseLeave={() => setIsShowControl(false)}
                  className=" relative bg-black w-[300px] h-[540px] rounded-md"
                  // className=" relative bg-black w-[300px] h-[540px] rounded-md -z-50"
                >
                  <Link
                    href={`/${post?.userPosted?.userName}/post/${post._id}`}
                  >
                    <video
                      ref={controlRef}
                      className="w-full h-full"
                      autoPlay
                      loop
                      muted={isMuted}
                    >
                      <source src={post?.video?.asset?.url}></source>
                      Your browser does not support this video
                    </video>
                  </Link>

                  {isShowControl && (
                    <div className=" flex justify-between">
                      <span className="absolute bottom-6 text-white text-xl md:text-2xl z-50 cursor-pointer left-4">
                        {isPlaying ? (
                          <BsFillPauseFill onClick={handleVideoControl} />
                        ) : (
                          <BsFillPlayFill onClick={handleVideoControl} />
                        )}
                      </span>
                      <span className="absolute bottom-6 text-white text-xl md:text-2xl z-50 cursor-pointer right-4">
                        {isMuted ? (
                          <BsFillVolumeUpFill onClick={handleVideoVolume} />
                        ) : (
                          <BsFillVolumeMuteFill onClick={handleVideoVolume} />
                        )}
                      </span>
                    </div>
                  )}
                </div>
                <div className="flex flex-col gap-6 items-center justify-center">
                  {/* <LikeButton
                    likes={likes?.likes}
                    handleLike={() => handleLike(true, post?._id, post?.likes)}
                    handleUnLike={() =>
                      handleLike(false, post?._id, post?.likes)
                    }
                  /> */}
                  <Link
                    href={`/${post?.userPosted?.userName}/post/${post._id}`}
                    className="bg-gray-100 text-2xl p-3 rounded-full"
                  >
                    <HiChatBubbleOvalLeftEllipsis />
                  </Link>

                  <div className="flex flex-col gap-4 items-start relative">
                    <WhatsappShareButton url={url}>
                      <div className="bg-gray-100 text-black p-3 rounded-full text-xl cursor-pointer">
                        <BsWhatsapp />
                      </div>
                    </WhatsappShareButton>
                    <TwitterShareButton url={url}>
                      <div className="text-black bg-gray-100 p-3 rounded-full text-xl cursor-pointer">
                        <BsTwitter />
                      </div>
                    </TwitterShareButton>

                    <div
                      onMouseLeave={hoverLeave}
                      onMouseEnter={() => setViewSocials(true)}
                      className="text-3xl cursor-pointer bg-gray-100 p-2 rounded-full"
                    >
                      <IoMdShareAlt />
                    </div>

                    <div
                      onMouseLeave={() => setViewSocials(false)}
                      onMouseEnter={() => setViewSocials(true)}
                      className={`absolute p-4 rounded-xl flex flex-col gap-4 left-10 bottom-0 z-50  bg-white shadow-2xl opacity-${
                        viewSocials ? 100 : 0
                      } transition-all duration-300 ${
                        viewSocials ? "visible" : "invisible"
                      }`}
                    >
                      <TelegramShareButton
                        className={`hover:bg-gray-100 opacity-${
                          viewSocials ? 100 : 0
                        } ${viewSocials ? "visible" : "invisible"}`}
                        url={url}
                      >
                        <div className="flex items-center gap-5">
                          <div className=" text-blue-400 text-2xl cursor-pointer">
                            <FaTelegram />
                          </div>
                          <p> Telegram</p>
                        </div>
                      </TelegramShareButton>

                      <PinterestShareButton
                        className="hover:bg-gray-100"
                        media=""
                        url={url}
                      >
                        <div className="flex items-center gap-5">
                          <div className=" text-red-400 text-2xl cursor-pointer">
                            <BsPinterest />
                          </div>
                          <p> Pinterest</p>
                        </div>
                      </PinterestShareButton>

                      <TelegramShareButton url={url}>
                        <div className="flex items-center gap-5">
                          <div className="bg-red-500 text-white p-2 rounded-full text-xs cursor-pointer">
                            <BsTelegram />
                          </div>
                          <p> Telegram</p>
                        </div>
                      </TelegramShareButton>

                      <FacebookShareButton url={url}>
                        <div className="flex items-center gap-5">
                          <div className=" text-blue-700 text-2xl cursor-pointer">
                            <BsFacebook />
                          </div>
                          <p> Facebook</p>
                        </div>
                      </FacebookShareButton>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <Link
          href={`/profile/${post?.userPosted?._id}`}
          className="border py-1 px-3 border-red-500 text-red-500 text-sm md:text-base justify-self-end hover:bg-red-200"
        >
          View Profile
        </Link>
      </div>
    </div>
  );
};

export default VideoCard;
