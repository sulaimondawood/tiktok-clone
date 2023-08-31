"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import React from "react";
import { Post } from "@/types/posts";
import Link from "next/link";
import { BsFillPlayFill } from "react-icons/bs";
import { BsFillPauseFill } from "react-icons/bs";
import { BsFillVolumeMuteFill } from "react-icons/bs";
import { BsFillVolumeUpFill } from "react-icons/bs";

interface IPost {
  post: Post[];
}

const VideoCard = ({ post }: IPost) => {
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(false);
  const [isShowControl, setIsShowControl] = useState(false);
  const controlRef = useRef<HTMLVideoElement | null>(null);
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
  return (
    <div className="w-full max-w-lg">
      {post.map((post: Post, index: number) => {
        return (
          <div key={index} className="border-b border-b-gray-200 py-6 md:py-10">
            <div className="flex justify-between items-center ">
              <div className="flex items-start w-full gap-4">
                <img
                  className="w-10 h-10 rounded-full"
                  src="https://images.unsplash.com/photo-1493612276216-ee3925520721?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8cmFuZG9tfGVufDB8fDB8fHww&auto=format&fit=crop&w=400&q=60"
                  alt=""
                />
                <div className="flex flex-col ">
                  <p className="font-semibold">Dawood</p>
                  <p className="text-sm mb-4">{post.caption}</p>

                  <div
                    onMouseEnter={() => setIsShowControl(true)}
                    onMouseLeave={() => setIsShowControl(false)}
                    className=" relative bg-black w-80 h-[540px] rounded-md"
                  >
                    <Link href={"/"}>
                      <video
                        ref={controlRef}
                        className="w-full h-full"
                        autoPlay
                        loop
                        muted={isMuted}
                      >
                        <source src={post.video.asset.url}></source>
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
                </div>
                <button className="border py-1 px-3 border-red-500 text-red-500 text-sm md:text-base justify-self-end">
                  Follow
                </button>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default VideoCard;
