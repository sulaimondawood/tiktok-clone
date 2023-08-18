import React from "react";
import SideBar from "../sidebar/SideBar";
import { BiSearch } from "react-icons/bi";
import { AiOutlinePlus } from "react-icons/ai";
import { MdMusicNote } from "react-icons/md";
const NavBar = () => {
  return (
    <div className="px-4 lg:px-8 py-2 border-b border-b-gray-300">
      <div className="flex  justify-between gap-4 lg:gap-0 items-center ">
        <h1 className="cursor-pointer text-lg lg:text-2xl flex items-center">
          <span className="text-3xl">
            <MdMusicNote />
          </span>
          <span className="hidden md:block">DingDong</span>
        </h1>
        <div className="relative h-[40px] lg:h-[40px] w-[300px] lg:w-[450px] l">
          <input
            className="w-full h-full bg-gray-100 rounded-full px-4 outline-0 indent-0 lg:indent-4 placeholder:text-xs lg:placeholder:text-base
           "
            type="text"
            placeholder="Search"
          />
          <span className="absolute top-1/2 -translate-y-1/2 right-4 text-lg lg:text-2xl text-gray-400 border-l-2 pl-4 cursor-pointer">
            <BiSearch />
          </span>
        </div>
        <div className="flex item-center gap-4">
          <div className="cursor-pointer flex gap-2 items-center justify-center rounded-full md:rounded-none border py-2 px-2 lg:px-4 border-gray-300">
            <span>
              <AiOutlinePlus />
            </span>
            <p className="hidden md:block font-semibold text-gray-500 text-sm">
              Upload
            </p>
          </div>
          <div className="cursor-pointer bg-red-500 py-2 px-2 lg:px-4 text-center text-sm text-white rounded">
            Login
          </div>
        </div>
      </div>
    </div>
  );
};

export default NavBar;
