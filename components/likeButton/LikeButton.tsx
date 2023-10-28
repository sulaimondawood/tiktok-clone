import useStore from "@/store/userStore/userStore";
import React, { useEffect, useState } from "react";
import { AiFillHeart } from "react-icons/ai";

interface IProps {
  handleLike: () => void;
  handleUnLike: () => void;
  likes: any[];
  styles: string;
  layout: string;
}

const LikeButton = ({
  handleLike,
  handleUnLike,
  likes,
  styles,
  layout,
}: IProps) => {
  const [liked, setLiked] = useState(false);

  const userProfile = useStore((state) => state.user);

  const checkLike = likes?.filter(
    (item: any) => item?._ref === userProfile?._id
  );
  useEffect(() => {
    if (checkLike?.length > 0) {
      setLiked(true);
    } else {
      setLiked(false);
    }
  }, [likes, checkLike]);
  return (
    <>
      {liked ? (
        <div className={`flex items-center ${layout}`}>
          <div
            onClick={handleUnLike}
            className={`bg-red-200 p-2 ${styles} rounded-full cursor-pointer text-red-500`}
          >
            <AiFillHeart />
          </div>
          <span className="text-xs font-semibold">{likes?.length || 0}</span>
        </div>
      ) : (
        <div className={`flex gap-2 items-center ${layout}`}>
          <div
            onClick={handleLike}
            className={`bg-gray-100 p-2 ${styles} rounded-full cursor-pointer`}
          >
            <AiFillHeart />
          </div>
          <span className="text-xs font-semibold">{likes?.length || 0}</span>
        </div>
      )}
    </>
  );
};

export default LikeButton;
