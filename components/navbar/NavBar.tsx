"use client";

import React, { useState } from "react";
import SideBar from "../sidebar/SideBar";
import { BiSearch } from "react-icons/bi";
import { AiOutlinePlus } from "react-icons/ai";
import { MdMusicNote } from "react-icons/md";
import { FaFacebook } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import { RxAvatar } from "react-icons/rx";
import Link from "next/link";

import { signIn, signOut, useSession } from "next-auth/react";
import { createUser } from "@/utils/constants/createUser";
import { Session } from "next-auth";

const NavBar = () => {
  const [showLogins, setShowLogins] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userCredentials, setUserCredentials] = useState<string | {}>("");

  const { data: session } = useSession<any>();
  const user = session?.user;
  console.log(user);
  console.log("users credentials");
  console.log("users id");
  // console.log(session?.user.);
  console.log(userCredentials);

  const provider =
    "flex items-center cursor-pointer justify-start gap-6 border border-gray-300 rounded px-2 py-3 w-full";

  const signInGoogle = () => {
    signIn("google");
    createUser(user);
    setUserCredentials(user!);
  };
  return (
    <section style={{ zIndex: "9999px" }} className="sticky top-0 left-0 ">
      <div className="relative"></div>
      <div className="px-4 lg:px-8 py-2 border-b border-b-gray-300 bg-white">
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
            <div className=" cursor-pointer flex gap-2 items-center justify-center rounded-full md:rounded-none border py-2 px-2 lg:px-4 border-gray-300">
              <span>
                <AiOutlinePlus />
              </span>
              <p className="hidden md:block font-semibold text-gray-500 text-sm">
                Upload
              </p>
            </div>
            <div className="relative">
              {userCredentials !== "" ? (
                <div
                  onClick={() => signOut()}
                  className="cursor-pointer bg-red-500 py-2 px-2 lg:px-4 text-center text-sm text-white rounded"
                >
                  Logout
                </div>
              ) : (
                <div
                  onClick={() => setShowLogins(!showLogins)}
                  className="cursor-pointer bg-red-500 py-2 px-2 lg:px-4 text-center text-sm text-white rounded"
                >
                  Login
                </div>
              )}

              {/* //modal pop up */}

              <div
                className={`flex flex-col py-4 px-4 md:px-5 items-center justify-center gap-4 absolute w-[300px] right-0 top-14  bg-white z-50 shadow-lg scale-0 transition-all duration-300 opacity-0 ${
                  showLogins && "scale-100 opacity-100 duration-300"
                }`}
              >
                <h1 className="text-xl md:text-2xl pb-4  font-semibold">
                  Login to DingDong
                </h1>
                <div
                  onClick={() => setShowLogins(false)}
                  className={`${provider}`}
                >
                  <span className="text-2xl">
                    <RxAvatar />
                  </span>
                  Use email and password
                </div>
                <div onClick={signInGoogle} className={`${provider}`}>
                  <span className="text-2xl">
                    <FcGoogle />
                  </span>
                  Continue with Google
                </div>
                <div
                  onClick={() => signIn("google")}
                  // onClick={() => setShowLogins(false)}
                  className={`${provider}`}
                >
                  <span className="text-2xl text-blue-600">
                    <FaFacebook />
                  </span>
                  Continue with Facebook
                </div>

                <div className="border-t-1 border-t-gray-300 mt-5">
                  <p>
                    Don't have an account? {""}{" "}
                    <Link
                      onClick={() => setShowLogins(false)}
                      href="/sign-up"
                      className="text-red-500"
                    >
                      Sign up
                    </Link>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default NavBar;
