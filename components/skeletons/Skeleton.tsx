import React from "react";

export const UserSkeleton = ({
  imgStyles,
  text1Styles,
  text2Styles,
}: {
  imgStyles: string;
  text1Styles: string;
  text2Styles: string;
}) => {
  return (
    <div className=" animate-pulse flex items-center gap-4">
      <div className={`rounded-full bg-slate-200 ${imgStyles}`}></div>

      <div className="flex flex-col gap-2">
        <div className={`bg-slate-200 ${text1Styles}`}></div>
        <div className={`bg-slate-200 ${text2Styles}`}></div>
      </div>
    </div>
  );
};

export const VideoCardSkeleton = () => {
  return (
    <>
      <div className="">
        <UserSkeleton
          imgStyles="w-12 h-12"
          text1Styles="w-[80px] h-[20px]"
          text2Styles="w-[100px] h-[20px]"
        />
        <div className="animate-pulse w-[300px] h-[500px] bg-slate-200 rounded-md mt-5"></div>
      </div>
    </>
  );
};
export const ExploreSkeleton = () => {
  return (
    <div className="animate-pulse">
      <div className="w-[300px] h-[400px] bg-slate-200 rounded-md mt-5"></div>
      <div className="w-[250px] h-[20px] bg-slate-200"></div>
    </div>
  );
};
export const ProfileSkeleton = () => {
  return (
    <div className="animate-pulse">
      <div className="w-[200px] h-[250px] bg-slate-200 rounded-md mt-5"></div>
    </div>
  );
};
export const PostSkeleton = () => {
  return (
    <div className="animate-pulse flex gap-5">
      <div className="w-full md:w-[50vw] h-screen bg-slate-200"></div>
      <div className="w-full md:w-[50vw] h-screen px-5 my-8 ">
        <div
          className="w-full md:w-[50vw]
"
        >
          <UserSkeleton
            imgStyles="w-10 h-10"
            text1Styles="w-[200px] h-[30px]"
            text2Styles="w-[150px] h-[20px]"
          />

          <div className="w-full  h-[10px] bg-slate-200 my-2"></div>
          <div className="w-full  h-[10px] bg-slate-200 my-2"></div>
          <div className="w-full  h-[10px] bg-slate-200 my-2"></div>
        </div>
      </div>
    </div>
  );
};
