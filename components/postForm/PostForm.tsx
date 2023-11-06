"use client";

import topics from "@/utils/constants/topics";
import React, { Dispatch, SetStateAction, useState } from "react";

const PostForm = ({
  isUploading,
  caption,
  setCap,
  category,
  setCategory,
  handleCreatePost,
}: {
  isUploading: boolean;
  category: string;
  setCategory: Dispatch<SetStateAction<string>>;
  caption: string;
  setCap: Dispatch<SetStateAction<string>>;
  handleCreatePost: () => any;
}) => {
  console.log(category, caption);

  return (
    <div className="flex flex-col gap-8">
      <div className="flex flex-col gap-4 w-full md::w-96">
        <label className="font-semibold" htmlFor="caption">
          Caption
        </label>
        <input
          className="border rounded py-3 px-4 indent-3 border-gray-400 hover:bg-gray-50 focus:outline-none"
          type="text"
          id="caption"
          value={caption}
          onChange={(e) => setCap(e.target.value)}
        />
      </div>
      <div className="flex flex-col gap-4 w-full md::w-96">
        <label className="font-semibold" htmlFor="topics">
          Category
        </label>
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="border rounded py-3 px-4 border-gray-400 hover:bg-gray-50 focus:outline-none"
        >
          <option value="">Select category</option>
          {topics.map((item: { id: number; name: string }) => {
            return (
              <option key={item.id} value={item.name}>
                {item.name}
              </option>
            );
          })}
        </select>
      </div>
      <div className="flex gap-4 md:gap-6">
        <button className="border hover:bg-gray-50 border-gray-300 rounded py-4 px-8 text-black">
          Discard
        </button>
        <button
          onClick={handleCreatePost}
          className="rounded bg-red-500 hover:bg-red-700
         text-white py-4 px-8"
        >
          {isUploading ? "Uploading..." : "Post"}
        </button>
      </div>
    </div>
  );
};

export default PostForm;
