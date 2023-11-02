"use client";

import PostForm from "@/components/postForm/PostForm";
import { client } from "@/sanity/lib/client";
import useStore from "@/store/userStore/userStore";
import { useRouter } from "next/navigation";
import React, { ChangeEvent, useState } from "react";
import { BsCloudArrowUpFill } from "react-icons/bs";
import { v4 as uuidv4 } from "uuid";

const Upload = () => {
  const [videoFile, setVideoFile] = useState<any>(null);
  const [isVideoFileLoading, setIsVideoFileLoading] = useState(false);
  const [isUploading, setUploading] = useState(false);
  const [videoFIleError, setVideoFileError] = useState(false);
  const [caption, setCaption] = useState("");
  const [category, setCategory] = useState("");

  const userState = useStore((state) => state.user);
  const userID = userState ? userState._id : null;

  const router = useRouter();

  const handleUpload = async (e: any) => {
    e.preventDefault();
    const file = e.target.files[0];
    console.log(file);
    const fileTypes = ["video/mp4", "video/webm"];

    if (fileTypes.includes(file.type)) {
      setIsVideoFileLoading(true);
      const response = await fetch(
        `https://${process.env.NEXT_PUBLIC_SANITY_PROJECT_ID}.api.sanity.io/v2021-06-07/assets/files/${process.env.NEXT_PUBLIC_SANITY_DATASET}`,
        {
          method: "POST",
          body: file,
          headers: {
            Authorization: `Bearer ${process.env.NEXT_PUBLIC_SANITY_WRITE_ACCESS}`,
            // Authorization: `Bearer ${process.env.SANITY_SECRET_KEY}`,
          },
        }
      );
      const data = await response.json();
      console.log(data);
      setVideoFile(data.document);
      setIsVideoFileLoading(false);
    } else {
      setIsVideoFileLoading(false);
      setVideoFileError(true);
    }
  };
  console.log(videoFile);

  const handleCreatePost = async () => {
    setUploading(true);

    if (userID) {
      const mutations = [
        {
          create: {
            _id: uuidv4(),
            _type: "post",
            caption: caption,
            video: {
              asset: {
                _type: "reference",
                _ref: videoFile._id,
              },
            },
            userId: userID,
            userPosted: {
              _type: "userPosted",
              _ref: userID,
            },
            topic: category,
          },
        },
      ];

      const createContentRes = await fetch(
        `https://${process.env.NEXT_PUBLIC_SANITY_PROJECT_ID}.api.sanity.io/v2023-08-16/data/mutate/${process.env.NEXT_PUBLIC_SANITY_DATASET}`,
        {
          method: "POST",
          body: JSON.stringify({ mutations }),
          headers: {
            "Content-type": "application/json",
            Authorization: `Bearer ${process.env.NEXT_PUBLIC_SANITY_WRITE_ACCESS}`,
          },
        }
      )
        .then((response) => response.json())
        .then((result) => console.log(result))
        .catch((error) => console.error(error));
      setUploading(false);
      router.push("/");
    } else {
      console.log("User ID is not defined");
      return;
    }
  };

  return (
    <div className="shadow-xl rounded-xl bg-white h-full w-[calc(100vw-280px)] ml-[250px] mt-10 p-14 my-4">
      {videoFIleError ? (
        <h1>Oopss! unsupported video format</h1>
      ) : videoFile ? (
        <div className="">
          <h1 className="text-xl font-semibold">Upload video</h1>
          <p className="text-gray-500">Post a video to your account</p>
          <div className="flex  gap-32 justify-center">
            <div className="h-[400px] w-[300px] mt-8 rounded-xl bg-gray-600">
              {isVideoFileLoading ? (
                <h1>Uploading, please wait...</h1>
              ) : (
                <video
                  className="w-full h-full"
                  src={videoFile?.url}
                  autoPlay
                  loop
                  controls
                ></video>
              )}
            </div>
            <PostForm
              caption={caption}
              setCap={setCaption}
              category={category}
              setCategory={setCategory}
              handleCreatePost={handleCreatePost}
              isUploading={isUploading}
            />
          </div>
        </div>
      ) : (
        <div className="border-dashed relative border-2 w-[800px] mx-auto h-full border-gray-300 rounded-xl p-10 flex flex-col justify-center items-center">
          <BsCloudArrowUpFill className="text-center text-4xl text-gray-400 mb-5" />

          <h1 className="text-gray-800 text-lg font-semibold text-center">
            Select video to upload
          </h1>
          <p className="text-center py-6 w-full ">
            Long videos can be split into multiple parts to get more exposure
          </p>
          <p className="text-center max-w-md w-full py-6">
            MP4 or WebM 720x1280 resolution or higher Up to 30 minutes Less than
            2 GB
          </p>

          <input
            className="invisible cursor-pointer absolute top-0 left-0 bottom-0 right-0"
            type="file"
            id="upload"
            onChange={handleUpload}
          />
          <label
            className="cursor-pointer bg-red-500 hover:bg-red-700 text-red-50 rounded px-4 py-2 w-48 text-center"
            htmlFor="upload"
          >
            Select file
          </label>
        </div>
      )}
    </div>
  );
};

export default Upload;
