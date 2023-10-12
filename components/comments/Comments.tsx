import React, {
  ChangeEvent,
  Dispatch,
  SetStateAction,
  useEffect,
  useState,
} from "react";

interface IProps {
  handleComment: (e:any) => void;
  comment: string;
  setComment: Dispatch<SetStateAction<string>>;
}

const Comments = ({ handleComment, comment, setComment }: IProps) => {
  const [isDisabled, setDisabled] = useState(true);

  const handleCommentMsg = (e: ChangeEvent<HTMLInputElement>) => {
    setComment(e.target.value);
  };

  const checkComment = () => {
    if (comment.length > 0) {
      setDisabled(false);
    } else {
      setDisabled(true);
    }
  };
  useEffect(() => {
    checkComment();
  }, [comment]);

  return (
    <div>
      <div className=" mt-5 ">
        <h1 className=" font-semibold py-3 text-black border-b-black border-b-2 w-fit">
          Comments
          <span></span>
          <span>(50)</span>
        </h1>
      </div>
      <div className="h-[240px] overflow-y-scroll border-y border-y-gray-300"></div>
      <div className="">
        <form onSubmit={handleComment} className="absolute bottom-5">
          <div className="flex gap-4">
            <input
              className=" py-3 px-4 w-[380px] border border-gray-300 focus:outline-none outline-none text-gray-700 rounded-lg bg-gray-100"
              value={comment}
              onChange={handleCommentMsg}
              type="text"
              placeholder="Add comment..."
            />
            <button
              onClick={handleComment}
              className="disabled:text-gray-400 enabled:text-red-500"
              disabled={isDisabled}
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
