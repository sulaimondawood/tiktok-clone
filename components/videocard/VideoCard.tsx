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
import { truncateText } from "@/utils/constants/truncate";
import { useRouter } from "next/navigation";
import { useAppState } from "@/store/state/state";
import { URL } from "@/utils/constants/getUsers";

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
  const [isShowFullText, setShowFullText] = useState(false);
  const { showLogins, setShowLogins } = useAppState();
  const [isInView, setIsInView] = useState(false);
  const controlRef = useRef<HTMLVideoElement | null>(null);

  useEffect(() => {
    const options = {
      root: null,
      rootMargin: "0px",
      threshold: 0.6, // Adjust this value as needed
    };

    const handleIntersection = (entries: any) => {
      if (entries[0].isIntersecting) {
        controlRef.current!.play();
        setIsInView(true);
      } else {
        controlRef.current!.pause();
        setIsInView(false);
      }
    };
    const observer = new IntersectionObserver(handleIntersection, options);
    observer.observe(controlRef.current!);

    return () => observer.disconnect();
  }, []);

  const router = useRouter();
  console.log(post);

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

  useEffect(() => {
    setUrl(window.location.href);
  }, []);

  const userProfile = useStore((state) => state.user);

  const handleLike = async (like: boolean, postID: string) => {
    if (!userProfile) {
      setShowLogins(true);
      return;
    }

    try {
      const url = `${URL}/api/post/like`;
      const data = {
        userID: userProfile?._id,
        postID,
        liked: like,
      };

      const response = await fetch(url, {
        cache: "no-store",
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
    } catch (error) {
      console.error("Error handling like:", error);
    }
  };

  return (
    <div className="w-full ">
      <div className=" border-b border-b-gray-200 py-6 md:py-10 flex items-start justify-between ">
        <div className="flex justify-between items-center ">
          <div className="flex items-start w-full gap-4">
            <img
              onClick={() => router.push(`/profile/${post.userPosted?._id}`)}
              className="w-8 cursor-pointer h-8 md:w-12 md:h-12 rounded-full"
              src={post?.userPosted?.image}
              alt=""
            />

            <div className="flex flex-col items-start ">
              <p
                onClick={() => router.push(`/profile/${post.userPosted?._id}`)}
                className="font-semibold cursor-pointer text-sm md:text-base"
              >
                {post?.userPosted?.userName}
              </p>
              <div className="text-ellipsis text-black ">
                <p className="text-xs md:text-sm mb-4 max-w-[80%] lg:max-w-md ">
                  {truncateText(post?.caption, 100, 99, isShowFullText)}
                  <span className="pl-2 uppercase text-blue-600 underline">
                    {`#${post?.topic}`}
                  </span>
                  {post?.caption.length >= 100 && (
                    <span className="ml-4">
                      <button
                        className="font-medium"
                        onClick={() => setShowFullText(!isShowFullText)}
                      >
                        {isShowFullText ? "less" : "more"}
                      </button>
                    </span>
                  )}
                </p>
              </div>

              <div className="flex justify-start md:justify-end items-end gap-5">
                <div
                  onMouseEnter={() => setIsShowControl(true)}
                  onMouseLeave={() => setIsShowControl(false)}
                  className=" relative bg-black w-[80%] h-[65vh] md:w-[300px] md:h-[540px] rounded-md"
                  // className=" relative bg-black w-[300px] h-[540px] rounded-md -z-50"
                >
                  <Link
                    href={`/${post?.userPosted?.userName}/post/${post._id}`}
                  >
                    <video
                      ref={controlRef}
                      className="w-full h-full rounded-md"
                      autoPlay={isInView}
                      loop
                      muted={isMuted}
                    >
                      <source src={post?.video?.asset?.url}></source>
                      Your browser does not support this video
                    </video>
                  </Link>

                  {isShowControl && (
                    <div className=" flex justify-between">
                      <span className="absolute bottom-4 md:bottom-6 text-white text-xl md:text-2xl z-50 cursor-pointer left-4">
                        {isPlaying ? (
                          <BsFillPauseFill onClick={handleVideoControl} />
                        ) : (
                          <BsFillPlayFill onClick={handleVideoControl} />
                        )}
                      </span>
                      <span className="absolute bottom-4 md:bottom-6 text-white text-xl md:text-2xl z-50 cursor-pointer right-4">
                        {isMuted ? (
                          <BsFillVolumeUpFill onClick={handleVideoVolume} />
                        ) : (
                          <BsFillVolumeMuteFill onClick={handleVideoVolume} />
                        )}
                      </span>
                    </div>
                  )}
                  <div className="absolute right-4 z-[999] bottom-10 flex md:hidden flex-col gap-4 items-center justify-center">
                    <LikeButton
                      activeStyle="text-red-500"
                      textStyles="text-white"
                      layout="flex-col gap-2"
                      styles="text-xl md:text-2xl text-white"
                      likes={post?.likes}
                      handleLike={() => handleLike(true, post?._id)}
                      handleUnLike={() => handleLike(false, post?._id)}
                    />
                    <Link
                      href={`/${post?.userPosted?.userName}/post/${post._id}`}
                      className="flex flex-col items-center justify-center gap-2"
                    >
                      <div className=" text-2xl text-white  ">
                        <HiChatBubbleOvalLeftEllipsis />
                      </div>
                      <span className="text-xs text-white font-semibold">
                        {post?.comments?.length || 0}
                      </span>
                    </Link>

                    <div className="flex flex-col gap-4 items-center relative">
                      <WhatsappShareButton url={url}>
                        <div className=" text-whiite  text-lg md:text-xl cursor-pointer">
                          <BsWhatsapp color="#ffffff" />
                        </div>
                      </WhatsappShareButton>
                      <TwitterShareButton url={url}>
                        <div className=" text-white  text-lg md:text-xl cursor-pointer">
                          <BsTwitter />
                        </div>
                      </TwitterShareButton>

                      <div
                        // onMouseLeave={hoverLeave}
                        onMouseLeave={() => setViewSocials(false)}
                        onMouseEnter={() => setViewSocials(true)}
                        className="text-2xl md:text-3xl cursor-pointer  text-white "
                      >
                        <IoMdShareAlt />
                      </div>

                      <div
                        onMouseLeave={() => setViewSocials(false)}
                        onMouseEnter={() => setViewSocials(true)}
                        className={`absolute p-4 rounded-xl flex flex-col gap-4 -right-full bottom-0 z-50  bg-white shadow-2xl opacity-${
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
                            <div className=" text-blue-400 text-xl md:text-2xl cursor-pointer">
                              <FaTelegram />
                            </div>
                            <p className="text-sm"> Telegram</p>
                          </div>
                        </TelegramShareButton>

                        <PinterestShareButton
                          className="hover:bg-gray-100"
                          media=""
                          url={url}
                        >
                          <div className="flex items-center gap-5">
                            <div className=" text-red-400 text-xl md:text-2xl cursor-pointer">
                              <BsPinterest />
                            </div>
                            <p className="text-sm"> Pinterest</p>
                          </div>
                        </PinterestShareButton>

                        <FacebookShareButton url={url}>
                          <div className="flex items-center gap-5">
                            <div className=" text-blue-700 text-xl md:text-2xl cursor-pointer">
                              <BsFacebook />
                            </div>
                            <p className="text-sm">Facebook</p>
                          </div>
                        </FacebookShareButton>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="hidden md:flex flex-col gap-6 items-center justify-center">
                  <LikeButton
                    textStyles="text-black"
                    layout="flex-col gap-2"
                    styles="text-xl md:text-2xl"
                    activeStyle="bg-red-200"
                    likes={post?.likes}
                    handleLike={() => handleLike(true, post?._id)}
                    handleUnLike={() => handleLike(false, post?._id)}
                  />
                  <Link
                    href={`/${post?.userPosted?.userName}/post/${post._id}`}
                    className="flex flex-col items-center justify-center gap-2"
                  >
                    <div className="bg-gray-100 text-2xl p-3 rounded-full">
                      <HiChatBubbleOvalLeftEllipsis />
                    </div>
                    <span className="text-xs font-semibold">
                      {post?.comments?.length || 0}
                    </span>
                  </Link>

                  <div className="flex flex-col gap-4 items-start relative">
                    <WhatsappShareButton url={url}>
                      <div className="bg-gray-100 text-black p-3 rounded-full text-lg md:text-xl cursor-pointer">
                        <BsWhatsapp />
                      </div>
                    </WhatsappShareButton>
                    <TwitterShareButton url={url}>
                      <div className="text-black bg-gray-100 p-3 rounded-full text-lg md:text-xl cursor-pointer">
                        <BsTwitter />
                      </div>
                    </TwitterShareButton>

                    <div
                      // onMouseLeave={hoverLeave}
                      onMouseLeave={() => setViewSocials(false)}
                      onMouseEnter={() => setViewSocials(true)}
                      className="text-2xl md:text-3xl cursor-pointer bg-gray-100 p-2 rounded-full"
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
                          <div className=" text-blue-400 text-xl md:text-2xl cursor-pointer">
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
                          <div className=" text-red-400 text-xl md:text-2xl cursor-pointer">
                            <BsPinterest />
                          </div>
                          <p> Pinterest</p>
                        </div>
                      </PinterestShareButton>

                      <FacebookShareButton url={url}>
                        <div className="flex items-center gap-5">
                          <div className=" text-blue-700 text-xl md:text-2xl cursor-pointer">
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
          className="hidden lg:block border py-1 px-3 border-red-500 text-red-500 text-sm md:text-base justify-self-end hover:bg-red-50"
        >
          View Profile
        </Link>
      </div>
    </div>
  );
};

export default VideoCard;
