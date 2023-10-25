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
      <div className="w-[250px] h-[20px]"></div>
    </div>
  );
};
export const ProfileSkeleton = () => {
  return (
    <div className="animate-pulse">
      <div className="w-[300px] h-[400px] bg-slate-200 rounded-md mt-5"></div>
      <div className="w-[300px] h-[20px]"></div>
    </div>
  );
};
