"use client";

import { client } from "@/sanity/lib/client";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";

const page = ({ params }: { params: any }) => {
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(false);
  const [isShowControl, setIsShowControl] = useState(false);
  const [postVideo, setPostVideo] = useState<any>(null);
  const [isVideoLoading, setIsvideoLoading] = useState(true);
  const [isEngageLoading, setIsEngageLoading] = useState(true);
  const controlRef = useRef<HTMLVideoElement | null>(null);

  const getPostDetails = async () => {
    const data = await axios.get(`http://localhost:3000/api/${params.id}`);
    setPostVideo(data.data);
    setIsvideoLoading(false);
    console.log(data);
  };
  useEffect(() => {
    getPostDetails();
  }, []);

  console.log(params);

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
    <section className="w-screen h-screen overflow-hidden flex gap-5 ">
      {isVideoLoading ? (
        "loading"
      ) : (
        <div className="relative w-[3600px] flex justify-center items-center">
          <div className="absolute bg-black opacity-80 inset-0">
            <video
              className="w-full h-full object-cover  blur-md"
              muted
              src={postVideo[0]?.video?.asset?.url}
            ></video>
          </div>
          <video
            className="w-full h-full z-50"
            controls
            autoPlay
            loop
            src={postVideo[0]?.video?.asset?.url}
          ></video>
          {/* <div
            onMouseEnter={() => ""}
            onMouseLeave={() => ""}
            className="basis-[3600px] bg-black relative flex justify-center"
          >
            <video
              className="w-full h-full"
              controls
              autoPlay
              loop
              src={postVideo[0]?.video?.asset?.url}
            ></video>
          </div> */}
        </div>
      )}
      <div className=" grow  bg-white overflow-y-scroll my-8">
        <div className="bg-gray-400 rounded">
          <div className="flex gap-4">
            <img
              className="w-10 h-10 rounded-full"
              src={
                "https://images.unsplash.com/photo-1493612276216-ee3925520721?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8cmFuZG9tfGVufDB8fDB8fHww&auto=format&fit=crop&w=400&q=60"
              }
              // src={urlForImage(post?.userPosted?.image).url()}
              alt=""
            />
            <div className="">
              {/* <p className="font-semibold">{post?.userPosted?.userName}</p>
              <p className="text-sm mb-4">{post?.caption}</p> */}
              <p className="font-semibold">Dawoood</p>
              <p className="text-sm mb-4">Trade with me man</p>
            </div>
          </div>
          <div className="text-ellipsis text-black ">
            <p>
              Lorem ipsum dolor sit amet consectetur, adipisicing elit. Numquam
              dolor architecto reprehenderit quo ipsum delectus alias eligendi
              eos ea dolorem nihil fuga nostrum, aliquam perspiciatis ipsa
              debitis neque, quam recusandae?
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default page;
