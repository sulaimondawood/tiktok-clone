"use client";

import { client } from "@/sanity/lib/client";
import axios from "axios";

import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";

import { AiFillHeart } from "react-icons/ai";
import { FaCommentDots } from "react-icons/fa";
import {
  BsFacebook,
  BsTwitter,
  BsTelegram,
  BsWhatsapp,
  BsPinterest,
} from "react-icons/bs";
import { FaTelegram } from "react-icons/fa";
import { IoMdShareAlt } from "react-icons/io";
import { truncateText } from "@/utils/constants/truncate";
import { copyText } from "@/utils/constants/copyText";

import {
  FacebookShareButton,
  LinkedinShareButton,
  PinterestShareButton,
  TelegramShareButton,
  TwitterShareButton,
  WhatsappShareButton,
} from "react-share";
import LikeButton from "@/components/likeButton/LikeButton";
import useStore from "@/store/userStore/userStore";

const page = ({ params }: { params: any }) => {
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(false);
  const [isShowControl, setIsShowControl] = useState(false);
  const [postVideo, setPostVideo] = useState<any>(null);
  const [isVideoLoading, setIsvideoLoading] = useState(true);
  const [isEngageLoading, setIsEngageLoading] = useState(true);
  const [isShowFullText, setShowFullText] = useState(false);
  const [url, setUrl] = useState<string>("");
  const [viewSocials, setViewSocials] = useState(false);
  const [copyLink, setCopyLink] = useState<string>("Copy link");
  const controlRef = useRef<HTMLVideoElement | null>(null);

  const getPostDetails = async () => {
    const data = await axios.get(`http://localhost:3000/api/${params.id}`);
    setPostVideo(data.data);
    setIsvideoLoading(false);
    console.log(data);
  };

  const userProfile = useStore((state) => state.user);
  console.log(userProfile);

  const handleLike = async (like: boolean) => {
    // if (userProfile?._id && userProfile?.name) {
    const res = await axios.put(`http://localhost:3000/api/post/like`, {
      userID: userProfile?._id,
      postID: postVideo[0]?._id,
      liked: like,
    });
    setPostVideo({ ...postVideo, likes: res?.data?.likes });
    // }
  };

  useEffect(() => {
    getPostDetails();
    setUrl(window.location.href);
  }, []);

  return (
    <section className="w-screen h-screen overflow-hidden flex gap-5 ">
      {isVideoLoading ? (
        "loading"
      ) : (
        <div className="relative w-[2800px] flex justify-center items-center">
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
        </div>
      )}
      <div className=" grow w-[1500px]  bg-white overflow-y-scroll my-8 px-5">
        <div className="bg-gray-50 rounded-md p-4 ">
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
              {/* <p className="font-semibold">{postVideo?.userPosted?.userName}</p>
              <p className="text-sm mb-4">
                {postVideo?.caption}
                <span>.</span>
                <span>2d ago</span>
              </p> */}
              <p className="font-semibold">Dawoood</p>
              <p className="text-sm mb-4">
                Trade with me man
                <span>.</span>
                <span>2d ago</span>
              </p>
            </div>
          </div>
          <div className="text-ellipsis text-black ">
            <p>
              {truncateText(
                "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Numquam dolor architecto reprehenderit quo ipsum delectus alias eligendi eos ea dolorem nihil fuga nostrum, aliquam perspiciatis ipsa debitis neque, quam recusandae",
                100,
                99,
                isShowFullText
              )}

              <span className="ml-4">
                <button
                  className="font-semibold"
                  onClick={() => setShowFullText(!isShowFullText)}
                >
                  {isShowFullText ? "less" : "more"}
                </button>
              </span>
            </p>
          </div>
        </div>
        <div className="flex justify-between items-start mt-4">
          <div className="flex gap-5 items-center">
            <LikeButton
              handleLike={() => handleLike(true)}
              handleUnLike={() => handleLike(false)}
            />
            <div className="flex gap-2 items-center">
              <div className="bg-gray-100 p-2 text-xl rounded-full cursor-pointer">
                <FaCommentDots />
              </div>
              <span className="text-xs font-semibold">50</span>
            </div>
          </div>
          <div className="flex gap-4 items-center relative">
            <WhatsappShareButton url={url}>
              <div className="bg-green-600 text-white p-2 rounded-full text-xs cursor-pointer">
                <BsWhatsapp />
              </div>
            </WhatsappShareButton>
            <TwitterShareButton url={url}>
              <div className="text-white bg-blue-400 p-2 rounded-full text-xs cursor-pointer">
                <BsTwitter />
              </div>
            </TwitterShareButton>

            <TelegramShareButton url={url}>
              <div className="bg-red-500 text-white p-2 rounded-full text-xs cursor-pointer">
                <BsTelegram />
              </div>
            </TelegramShareButton>

            <FacebookShareButton url={url}>
              <div className=" text-blue-700 text-2xl cursor-pointer">
                <BsFacebook />
              </div>
            </FacebookShareButton>
            <div
              onMouseLeave={() => setViewSocials(false)}
              onMouseEnter={() => setViewSocials(true)}
              className="text-2xl cursor-pointer op"
            >
              <IoMdShareAlt />
            </div>

            <div
              className={`absolute p-4 rounded-xl flex flex-col gap-4 right-0 top-8 w-[250px] bg-white shadow-2xl opacity-${
                viewSocials ? 100 : 0
              } transition-all duration-300 ${
                viewSocials ? "visible" : "invisible"
              }`}
            >
              <TelegramShareButton
                onMouseLeave={() => setViewSocials(false)}
                onMouseEnter={() => setViewSocials(true)}
                className={`hover:bg-gray-100 opacity-${
                  viewSocials ? 100 : 0
                } ${viewSocials ? "visible" : "invisible"}`}
                url={url}
              >
                <div className="flex items-center gap-5">
                  <div className=" text-blue-400 text-2xl cursor-pointer">
                    <FaTelegram />
                  </div>
                  <p>Share to Telegram</p>
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
                  <p>Share to Pinterest</p>
                </div>
              </PinterestShareButton>
            </div>
          </div>
        </div>
        <div className="mt-4 flex gap-4 items-center bg-gray-100 border-gray-300 border px-2 py-1 rounded-md">
          <p className="text-sm text-gray-700 ">
            {truncateText(url, 45, 44, false)}
          </p>
          <button
            onClick={() => copyText(url, setCopyLink)}
            className="font-semibold border-none text-black text-sm "
          >
            {copyLink}
          </button>
        </div>
      </div>
    </section>
  );
};

export default page;
