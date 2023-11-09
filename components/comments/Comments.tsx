import { client } from "@/sanity/lib/client";
import Link from "next/link";
import React, {
  ChangeEvent,
  Dispatch,
  SetStateAction,
  useEffect,
  useState,
} from "react";

import useStore from "@/store/userStore/userStore";
import { useAppState } from "@/store/state/state";

interface IProps {
  handleComment: (e: any) => void;
  comment: string;
  setComment: Dispatch<SetStateAction<string>>;
  comments: userComment[];

  loadingComments: boolean;
}

interface userType {
  image: string;
  userName: string;
  _id: string;
  _type?: string;
}

interface userComment {
  comment: string;
  userPosted: {
    _ref: string;
    _type: string;
  };
}

const Comments = ({
  handleComment,
  comment,
  setComment,
  comments,

  loadingComments,
}: IProps) => {
  const [isDisabled, setDisabled] = useState(true);
  const [loadComms, setLoadComms] = useState(false);
  const [users, setUsers] = useState([]);

  const userState = useStore((state) => state.user);

  const handleCommentMsg = (e: ChangeEvent<HTMLInputElement>) => {
    setComment(e.target.value);
  };

  const checkComment = () => {
    if (comment.length > 0 && userState) {
      setDisabled(false);
    } else {
      setDisabled(true);
    }
  };

  const checkUsersComments = comments?.map((item: userComment) => {
    return item;
  });

  console.log("Check users comments");
  console.log(checkUsersComments);

  const getUsers = async () => {
    const res = await client.fetch(`*[_type == "user"]{
      _id,
      userName,
      image,
      _type
    }`);

    setUsers(res);
  };

  useEffect(() => {
    getUsers();
    if (checkUsersComments?.length > 0) {
      setLoadComms(false);
    } else {
      setLoadComms(true);
    }
    checkComment();
  }, [comment, checkUsersComments?.length]);

  return (
    <div>
      <div className=" mt-5 ">
        <h1 className=" font-semibold py-3 text-black border-b-black border-b-2 w-fit">
          Comments
          <span className="whitespace-pre">
            {!loadComms ? `(${comments?.length})` : `(${0})`}
          </span>
        </h1>
      </div>
      <div className="h-[240px] overflow-y-scroll border-y border-y-gray-300 py-4">
        {!loadComms ? (
          <>
            {comments?.map((item: userComment, index: number) => {
              return (
                <div key={index} className="">
                  {users.map(
                    (user: userType, index) =>
                      user?._id === item.userPosted?._ref && (
                        <div
                          key={index}
                          className="flex gap-3 items-start py-1"
                        >
                          <Link href={`/profile/${user?._id}`}>
                            <img
                              src={user?.image}
                              alt=""
                              className="w-8 h-8 rounded-full"
                            />
                          </Link>
                          <div className="flex flex-col">
                            <Link href={`/profile/${user?._id}`}>
                              <p className="font-semibold text-sm">
                                {user?.userName}
                              </p>
                            </Link>
                            <p className="text-sm text-gray-600">
                              {item.comment}
                            </p>
                          </div>
                        </div>
                      )
                  )}
                </div>
              );
            })}
          </>
        ) : (
          <div className="">
            <h1>Be the first to comment</h1>
          </div>
        )}
      </div>

      <form
        onSubmit={handleComment}
        className="fixed md:absolute bg-white w-full py-4 bottom-0"
      >
        <div className="flex gap-4">
          <input
            className=" py-3 px-3 w-[calc(100vw-90px)] md:px-4 md:w-[380px] border border-gray-300 focus:outline-none outline-none text-gray-700 rounded-lg bg-gray-100"
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
  );
};

export default Comments;
