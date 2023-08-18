import Image from "next/image";
import React from "react";
import { Post } from "@/types/posts";

interface IPost {
  post: Post[];
}

const VideoCard = ({ post }: IPost) => {
  console.log(post);
  return (
    <div className="w-full max-w-lg">
      {post.map((post: Post, index: number) => {
        return (
          <div key={index} className="">
            <div className="flex justify-between items-center ">
              <div className="flex items-start gap-4">
                <img
                  className="w-10 h-10 rounded-full"
                  src="https://images.unsplash.com/photo-1493612276216-ee3925520721?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8cmFuZG9tfGVufDB8fDB8fHww&auto=format&fit=crop&w=400&q=60"
                  alt=""
                />
                <div className="flex flex-col ">
                  <p className="font-semibold">Dawood</p>
                  <p className="text-sm">{post.caption}</p>
                </div>
              </div>
            </div>

            <div className="h-14 w-24">
              <video className="w-full h-full">
                <source src={post.video.asset.url}></source>
              </video>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default VideoCard;
