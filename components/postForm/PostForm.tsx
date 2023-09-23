import topics from "@/utils/constants/topics";
import React, { Dispatch, SetStateAction, useState } from "react";

const PostForm = ({
  caption,
  setCap,
}: {
  caption: string;
  setCap: Dispatch<SetStateAction<string>>;
}) => {
  return (
    <div className="flex flex-col gap-8">
      <div className="flex flex-col gap-4 w-96">
        <label className="font-semmibold" htmlFor="caption">
          Caption
        </label>
        <input
          className="border rounded py-3 px-4 indent-3 border-gray-400 hover:bg-gray-50 focus:outline-none"
          type="text"
          id="caption"
        />
      </div>
      <div className="flex flex-col gap-4 w-96">
        <label className="font-semibold" htmlFor="topics">
          Topics
        </label>
        <select className="border rounded py-3 px-4 border-gray-400 hover:bg-gray-50 focus:outline-none">
          {topics.map((item: { id: number; name: string }) => {
            return (
              <option key={item.id} value={item.name}>
                {item.name}
              </option>
            );
          })}
        </select>
      </div>
      <div className="flex gap-6">
        <button className="border border-gray-300 rounded py-4 px-8 text-black">
          Discard
        </button>
        <button className="rounded bg-red-500 text-white py-4 px-8"></button>
      </div>
    </div>
  );
};

export default PostForm;
