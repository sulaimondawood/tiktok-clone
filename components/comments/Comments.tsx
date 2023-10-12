import React, { Dispatch, SetStateAction } from "react";

interface IProps {
  comment: string;
  setComment: Dispatch<SetStateAction<string>>;
}

const Comments = ({ comment, setComment }: IProps) => {
  return (
    <div>
      <div className=" mt-5 ">
        <h1 className=" font-semibold py-3 text-black border-b-black border-b-2 w-fit">
          Comments
          <span></span>
          <span>(50)</span>
        </h1>
      </div>
      <div className="h-[260px] bg-gray-400 border-y border-y-gray-300"></div>
      <div className="">
        <form className="absolute bottom-5">
          <div className="flex gap-4">
            <input
              className="border border-gray-300 text-gray-700 rounded-lg bg-gray-100"
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              type="text"
              placeholder="Add comment..."
            />
            <button
              className="disabled:text-gray-400 enabled:text-red-500"
              disabled={true}
            >
              Post
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Comments;
