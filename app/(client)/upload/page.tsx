import React from "react";
import { BsCloudArrowUpFill } from "react-icons/bs";
const page = () => {
  return (
    <div className="shadow-xl rounded-xl bg-white h-full w-full p-14 my-4 mx-10 ">
      <div className="border-dashed relative border-2 w-[800px] h-full border-gray-300 rounded-xl p-10 flex flex-col justify-center items-center">
        <BsCloudArrowUpFill className="text-center text-4xl text-gray-400 mb-5" />

        <h1 className="text-gray-800 text-lg font-semibold text-center">
          Select video to upload
        </h1>
        <p className="text-center py-6 w-full ">
          Long videos can be split into multiple parts to get more exposure
        </p>
        <p className="text-center max-w-md w-full py-6">
          MP4 or WebM 720x1280 resolution or higher Up to 30 minutes Less than 2
          GB
        </p>

        <input
          className="invisible cursor-pointer absolute top-0 left-0 bottom-0 right-0"
          type="file"
          id="upload"
        />
        <label
          className="cursor-pointer bg-red-500 text-red-50 rounded px-4 py-2 w-48 text-center"
          htmlFor="upload
        "
        >
          Select file
        </label>
      </div>
    </div>
  );
};

export default page;
