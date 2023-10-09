import React, { useState } from "react";
import { AiFillHeart } from "react-icons/ai";

const LikeButton = () => {
  const [liked, unLiked] = useState(false);
  return (
    <div className="flex gap-2 items-center">
      <div className="bg-gray-100 p-2 text-xl rounded-full cursor-pointer">
        <AiFillHeart />
      </div>
      <span className="text-xs font-semibold">50</span>
    </div>
  );
};

export default LikeButton;
