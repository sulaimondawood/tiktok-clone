"use client";

import { client } from "@/sanity/lib/client";
import axios from "axios";

import { useRouter } from "next/navigation";
import { FormEvent, useEffect, useRef, useState } from "react";

import { AiFillHeart, AiOutlineCloseCircle } from "react-icons/ai";
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
import { urlForImage } from "@/sanity/lib/image";
import Comments from "@/components/comments/Comments";
import { headers } from "next/dist/client/components/headers";

const page = ({ params }: { params: any }) => {
  const [postVideo, setPostVideo] = useState<any>(null);
  const [isVideoLoading, setIsvideoLoading] = useState(true);
  const [comment, setComment] = useState("");
  const [isShowFullText, setShowFullText] = useState(false);
  const [url, setUrl] = useState<string>("");
  const [loadingComments, setLoadingComments] = useState(true);
  const [users, setUsers] = useState([]);
  const [viewSocials, setViewSocials] = useState(false);
  const [copyLink, setCopyLink] = useState<string>("Copy link");
  const controlRef = useRef<HTMLVideoElement | null>(null);

  const router = useRouter();

  const getPostDetails = async () => {
    const data = await axios.get(`http://localhost:3000/api/${params.id}`);
    setPostVideo(data.data[0]);
    setIsvideoLoading(false);
    console.log(data.data[0]);
  };

  const userProfile = useStore((state) => state.user);

  const handleLike = async (like: boolean) => {
    if (!userProfile) {
      return;
    }

    try {
      const url = "http://localhost:3000/api/post/like";
      const data = {
        userID: userProfile?._id,
        postID: postVideo?._id,
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
      setPostVideo({ ...postVideo, likes: responseData.likes });
    } catch (error) {
      console.error("Error handling like:", error);
    }
  };

  const handleAddComment = async (e: FormEvent) => {
    e.preventDefault();
    if (userProfile && comment) {
      const res = await axios.put("http://localhost:3000/api/comments", {
        userID: userProfile?._id,
        postID: postVideo?._id,
        comment,
      });

      const data = res.data;
      setPostVideo({ ...postVideo, comments: data.comments });
      setComment("");
      setLoadingComments(false);
      console.log(postVideo.comments);
    }
  };

  const getUsers = async () => {
    const res = await client.fetch(`*[_type == "user"]{
      _id,
      userName,
      image,
      _type
    }`);

    setUsers(res);
    console.log(res);
  };

  useEffect(() => {
    getPostDetails();
    getUsers();
    setUrl(window.location.href);
  }, []);

  const hoverLeave = () => {
    setTimeout(() => {
      setViewSocials(false);
    }, 3000);
  };
  return (
    <section className="w-screen h-screen overflow-hidden flex gap-5 ">
      {isVideoLoading ? (
        "loading"
      ) : (
        <div className="relative w-[2800px] flex justify-center items-center">
          <div className="absolute bg-black  inset-0">
            {/* <div className="absolute bg-black opacity-80 inset-0"> */}
            <video
              className="w-full h-full object-cover opacity-30  blur-md"
              muted
              src={postVideo?.video?.asset?.url}
            ></video>
          </div>
          <button
            onClick={() => router.push("/")}
            className="cursor-pointer border-none text-white text-4xl absolute top-6 left-7 z-[999]"
          >
            <AiOutlineCloseCircle />
          </button>
          <video
            className="w-full h-full z-50"
            controls
            autoPlay
            loop
            src={postVideo?.video?.asset?.url}
          ></video>
        </div>
      )}
      <div className=" grow w-[1500px]  bg-white my-8 px-5">
        <div className="bg-gray-50 rounded-md p-4 ">
          <div className="flex gap-4">
            <img
              className="w-10 h-10 rounded-full"
              src={postVideo?.userPosted?.image}
              alt=""
            />
            <div className="">
              <p className="font-semibold">{postVideo?.userPosted?.userName}</p>
              <p className="text-sm mb-4">
                {postVideo?.caption}
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
              likes={postVideo?.likes}
              handleLike={() => handleLike(true)}
              handleUnLike={() => handleLike(false)}
            />
            <div className="flex gap-2 items-center">
              <div className="bg-gray-100 p-2 text-xl rounded-full cursor-pointer">
                <FaCommentDots />
              </div>
              <span className="text-xs font-semibold">
                {!loadingComments ? `${postVideo?.comments?.length}` : `${0}`}
              </span>
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
              onMouseLeave={hoverLeave}
              onMouseEnter={() => setViewSocials(true)}
              className="text-2xl cursor-pointer op"
            >
              <IoMdShareAlt />
            </div>

            <div
              onMouseLeave={() => setViewSocials(false)}
              onMouseEnter={() => setViewSocials(true)}
              className={`absolute p-4 rounded-xl flex flex-col gap-4 right-0 top-8 w-[250px] bg-white shadow-2xl opacity-${
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
        <Comments
          loadingComments={loadingComments}
          comments={postVideo?.comments}
          handleComment={handleAddComment}
          comment={comment}
          setComment={setComment}
          users={users}
        />
      </div>
    </section>
  );
};

export default page;
