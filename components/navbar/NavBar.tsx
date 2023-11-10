"use client";

import React, { FormEvent, useEffect, useState } from "react";
import SideBar from "../sidebar/SideBar";
import { BiSearch } from "react-icons/bi";
import {
  AiOutlinePlus,
  AiOutlineCloseCircle,
  AiOutlineLogout,
} from "react-icons/ai";
import { MdMusicNote } from "react-icons/md";
import { FaFacebook } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import { RxAvatar } from "react-icons/rx";
import Link from "next/link";

import { signIn, signOut, useSession } from "next-auth/react";
import { createUser } from "@/utils/constants/createUser";
import { Session } from "next-auth";
import useStore from "@/store/userStore/userStore";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useAppState } from "@/store/state/state";
import { URL } from "@/utils/constants/getUsers";

const provider =
  "flex items-center cursor-pointer justify-start gap-6 border border-gray-300 rounded px-2 py-3 w-full";

type IUser = {
  name?: string;
  email?: string;
  image?: string;
};

const NavBar = () => {
  const { showLogins, setShowLogins } = useAppState();
  const [input, setInput] = useState("");
  const [loginState, setLoginState] = useState(false);
  const { data: session, status } = useSession<any>();
  const user = session?.user;
  console.log(user);

  const router = useRouter();

  const userState = useStore((state) => state.user);
  const removeUser = useStore((state) => state.removeUser);
  const updateUser = useStore((state) => state.updateUser);

  const handleSearch = (e: FormEvent) => {
    e.preventDefault();
    if (input) {
      router.push(`/search/${input}`);
      setInput("");
    }
  };

  const signInWithProvider = async (provider: string) => {
    await signIn(provider);
    createUser(user, updateUser);
  };

  const signOutUser = () => {
    signOut({ callbackUrl: URL });
    removeUser();
  };

  useEffect(() => {
    if (session) {
      updateUser(user);
    }
  }, [session]);
  return (
    <section style={{ zIndex: "9999" }} className="sticky top-0 left-0 ">
      <div className="relative"></div>
      <div className="px-4 lg:px-8 py-2 border-b border-b-gray-300 bg-white">
        <div className="flex  justify-between gap-4 lg:gap-0 items-center ">
          <h1 className="cursor-pointer text-lg lg:text-2xl flex items-center">
            <span className="text-3xl">
              <MdMusicNote />
            </span>
            <span className="hidden md:block">DingDong</span>
          </h1>
          <form onSubmit={handleSearch}>
            <div className="relative h-[35px] w-[150px] sm:h-[40px] sm:w-[300px] lg:h-[50px] lg:w-[450px] l">
              <input
                className="w-full h-full hover:border text-xs sm:text-sm md:text-base hover:border-gray-200 bg-gray-100 rounded-full px-4 outline-0 indent-0 lg:indent-4 placeholder:text-xs lg:placeholder:text-base
           "
                value={input}
                onChange={(e) => setInput(e.target.value)}
                type="text"
                placeholder="Search"
              />
              <button
                onClick={handleSearch}
                className="absolute top-1/2 -translate-y-1/2 right-4 text-base sm:text-lg lg:text-2xl text-gray-400 border-l-2 pl-4 cursor-pointer"
              >
                <BiSearch />
              </button>
            </div>
          </form>
          <div className="flex item-center gap-4">
            {userState && (
              <Link
                href="/upload"
                className=" cursor-pointer flex gap-2 items-center justify-center rounded-full md:rounded-none border py-2 px-2 lg:px-4 border-gray-300 hover:bg-gray-50"
              >
                <span>
                  <AiOutlinePlus />
                </span>
                <button className="hidden md:block font-semibold text-gray-500 text-sm ">
                  Upload
                </button>
              </Link>
            )}

            <>
              {userState && (
                <div
                  className="relative w-8 h-8
                "
                >
                  <Image
                    onClick={() => setLoginState(!loginState)}
                    className="rounded-full cursor-pointer"
                    fill
                    src={(userState as any).image}
                    alt="profile"
                  ></Image>

                  <div
                    onClick={() => signOutUser()}
                    className={`${
                      loginState
                        ? "opacity-100 scale-100 z-[9999] visible"
                        : "opacity-0 scale-0 invisible"
                    } transition-all duration-150 absolute top-12 -left-[120%] 
                    bg-red-500 py-2 px-4 text-center text-sm text-white rounded
                    `}
                  >
                    <span>Logout</span>
                  </div>
                </div>
              )}
            </>
            <div className="relative">
              {userState ? (
                <div
                  onClick={() => signOutUser()}
                  className="cursor-pointer hidden md:block bg-red-500 py-2 px-2 lg:px-4 text-center text-sm text-white rounded"
                >
                  <span className="">Logout</span>
                </div>
              ) : (
                <div
                  onClick={() => setShowLogins(true)}
                  className="cursor-pointer bg-red-500 py-2 px-2 lg:px-4 text-center text-sm text-white rounded"
                >
                  Login
                </div>
              )}

              {/* //modal pop up */}
              <>
                <div
                  className={`opacity-0 transition-all duration-150 ${
                    showLogins &&
                    "fixed left-0 right-0 bottom-0 top-0 z-50 bg-[#00000070] duration-150 opacity-100"
                  }`}
                ></div>

                <div
                  className={`flex flex-col py-4 px-4 md:px-5 items-center justify-center gap-4 absolute w-[300px] right-0 top-14  bg-white z-50 shadow-lg scale-0 transition-all duration-300 opacity-0 ${
                    showLogins && "scale-100 opacity-100 duration-300"
                  }`}
                >
                  <h1 className="text-xl md:text-2xl pb-4  font-semibold">
                    Login to DingDong
                  </h1>

                  <div
                    onClick={() => signInWithProvider("google")}
                    className={`${provider}`}
                  >
                    <span className="text-2xl">
                      <FcGoogle />
                    </span>
                    Continue with Google
                  </div>
                  <div
                    onClick={() => signInWithProvider("facebook")}
                    // onClick={() => setShowLogins(false)}
                    className={`${provider}`}
                  >
                    <span className="text-2xl text-blue-600">
                      <FaFacebook />
                    </span>
                    Continue with Facebook
                  </div>
                  <div
                    onClick={() => setShowLogins(false)}
                    className="flex items-center cursor-pointer justify-center text-center gap-6 bg-red-500 text-white rounded px-2 py-3 w-full"
                  >
                    Cancel
                  </div>
                </div>
              </>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default NavBar;
