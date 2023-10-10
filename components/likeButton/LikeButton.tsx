import React, { useState } from "react";
import { AiFillHeart } from "react-icons/ai";

interface IProps {
  handleLike: () => void;
  handleUnLike: () => void;
}

const LikeButton = ({ handleLike, handleUnLike }: IProps) => {
  const [liked, unLiked] = useState(false);
  return (
    <>
      {liked ? (
        <div className="flex gap-2 items-center">
          <div
            onClick={handleUnLike}
            className="bg-red-200 p-2 text-xl rounded-full cursor-pointer text-red-500"
          >
            <AiFillHeart />
          </div>
          <span className="text-xs font-semibold">50</span>
        </div>
      ) : (
        <div className="flex gap-2 items-center">
          <div
            onClick={handleLike}
            className="bg-gray-100 p-2 text-xl rounded-full cursor-pointer"
          >
            <AiFillHeart />
          </div>
          <span className="text-xs font-semibold">50</span>
        </div>
      )}
    </>
  );
};

export default LikeButton;
