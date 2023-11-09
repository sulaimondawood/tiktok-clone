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
import { PostSkeleton } from "@/components/skeletons/Skeleton";
import { useAppState } from "@/store/state/state";
import { URL } from "@/utils/constants/getUsers";

const Post = ({ params }: { params: any }) => {
  const [postVideo, setPostVideo] = useState<any>(null);
  const [isVideoLoading, setIsvideoLoading] = useState(true);
  const [comment, setComment] = useState("");
  const [isShowFullText, setShowFullText] = useState(false);
  const [url, setUrl] = useState<string>("");
  const [loadingComments, setLoadingComments] = useState(true);
  // const [users, setUsers] = useState([]);
  const [viewSocials, setViewSocials] = useState(false);
  const [copyLink, setCopyLink] = useState<string>("Copy link");
  const controlRef = useRef<HTMLVideoElement | null>(null);

  const { showLogins, setShowLogins } = useAppState();

  const router = useRouter();

  const userProfile = useStore((state) => state.user);

  const handleLike = async (like: boolean) => {
    if (!userProfile) {
      return;
    }

    try {
      const url = `${URL}/api/post/like`;
      const data = {
        userID: userProfile?._id,
        postID: postVideo?._id,
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
      setPostVideo({ ...postVideo, likes: responseData.likes });
    } catch (error) {
      console.error("Error handling like:", error);
    }
  };

  const handleAddComment = async (e: FormEvent) => {
    e.preventDefault();
    if (!userProfile && !comment) {
      return;
    } else {
      const res = await fetch(`${URL}/api/comments`, {
        cache: "no-store",
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userID: userProfile?._id,
          postID: postVideo?._id,
          comment,
        }),
      });

      const data = await res.json();
      setPostVideo({ ...postVideo, comments: data.comments });
      setComment("");
      setLoadingComments(false);
    }
  };

  //   const query = `*[_type == "post" && _id == "${params.id}"]{
  //   _id,
  //    caption,
  //      video{
  //       asset->{
  //         _id,
  //         url
  //       }
  //     },
  //     userId,
  //     userPosted->,
  //   likes,
  //   comments
  // } `;

  //   const res = await client.fetch(query);
  //   console.log(res);
  //   setPostVideo(res[0]);
  //   setIsvideoLoading(false);
  // };
  useEffect(() => {
    const getPostDetails = async () => {
      const query = `*[_type == "post" && _id == "${params.id}"]{
    _id,
     caption,
       video{
        asset->{
          _id,
          url
        }
      },
      userId,
      userPosted->,
    likes,
    comments
  } `;

      const res = await client.fetch(query);

      setPostVideo(res[0]);
      setIsvideoLoading(false);
    };
    getPostDetails();
    // getUsers();
    setUrl(window.location.href);
  }, []);

  return (
    <section className="w-screen  h-screen md:overflow-hidden flex flex-col lg:flex-row  md:gap-5 ">
      {isVideoLoading ? (
        <PostSkeleton />
      ) : (
        <div className="relative w-full lg:w-[2800px] flex justify-center items-center">
          <div className="absolute bg-black  inset-0">
            {/* <div className="absolute bg-black opacity-80 inset-0"> */}
            <video
              className="w-full h-full object-cover opacity-30  blur-md"
              muted
              src={postVideo?.video?.asset?.url}
            ></video>
          </div>
          <button
            onClick={() => router.back()}
            className="cursor-pointer border-none text-white text-2xl md:text-4xl absolute top-6 left-7 z-[999]"
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
      <div className=" grow w-full h-full md:w-[35vw] lg:w-[1500px]  bg-white my-8 px-5">
        <div className="bg-gray-50 rounded-md p-4 ">
          <div className="flex gap-4">
            <img
              className="w-10 h-10 rounded-full"
              src={postVideo?.userPosted?.image}
              alt=""
            />
            <div className="">
              <p className="font-semibold">
                {postVideo?.userPosted?.userName
                  .replaceAll(" ", "")
                  .toLowerCase()}
              </p>
              <p className="text-sm mb-4">{postVideo?.userPosted?.userName}</p>
            </div>
          </div>
          <div className="text-ellipsis text-black ">
            {isVideoLoading ? (
              "Loading caption..."
            ) : (
              <p>
                {truncateText(postVideo?.caption, 100, 99, isShowFullText)}

                {postVideo?.caption.length >= 100 && (
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
            )}
          </div>
        </div>
        <div className="flex justify-between items-start mt-4">
          <div className="flex gap-5 items-center">
            <LikeButton
              textStyles="text-black"
              layout="flex-row gap-2"
              activeStyle="bg-red-200"
              styles="text-xl bg-gray-100 p-2 rounded-full text-black"
              likes={postVideo?.likes}
              handleLike={() => handleLike(true)}
              handleUnLike={() => handleLike(false)}
            />
            <div className="flex gap-2 items-center">
              <div className="bg-gray-100 p-2 text-xl rounded-full cursor-pointer">
                <FaCommentDots />
              </div>
              <span className="text-xs font-semibold">
                {postVideo?.comments?.length >= 1
                  ? `${postVideo?.comments?.length}`
                  : `${0}`}
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
              onMouseLeave={() => setViewSocials(false)}
              onMouseEnter={() => setViewSocials(true)}
              className="text-2xl cursor-pointer"
            >
              <IoMdShareAlt />
            </div>

            <div
              onMouseLeave={() => setViewSocials(false)}
              onMouseEnter={() => setViewSocials(true)}
              className={`absolute p-4 rounded-xl flex flex-col gap-4 right-0 top-4 w-[250px] bg-white shadow-2xl opacity-${
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
          // users={users}
        />
      </div>
    </section>
  );
};

export default Post;
