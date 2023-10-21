import useStore from "@/store/userStore/userStore";
import { signIn, signOut, useSession } from "next-auth/react";
import Link from "next/link";
import React, { useState } from "react";
import { FaFacebook } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import { createUser } from "@/utils/constants/createUser";

const Login = () => {
  const { data: session } = useSession<any>();
  const user = session?.user;
  const userState = useStore((state) => state.user);
  const removeUser = useStore((state) => state.removeUser);
  const updateUser = useStore((state) => state.updateUser);
  const [userCredentials, setUserCredentials] = useState<any>(false);

  const signInGoogle = () => {
    signIn("google");
    createUser(user, updateUser);
    // updateUser(user);
    setUserCredentials(true);
  };
  const provider =
    "flex items-center cursor-pointer justify-start gap-6 border border-gray-300 rounded px-2 py-3 w-full";
  return (
    <main>
      <div className="">
        <div className="">
          <div
            className={`flex flex-col py-4 px-4 md:px-5 items-center justify-center gap-4  w-[300px] bg-white z-50 shadow-lg `}
          >
            <h1 className="text-xl md:text-2xl pb-4  font-semibold">
              Login to DingDong
            </h1>

            <div onClick={signInGoogle} className={`${provider}`}>
              <span className="text-2xl">
                <FcGoogle />
              </span>
              Continue with Google
            </div>
            <div onClick={() => signIn("google")} className={`${provider}`}>
              <span className="text-2xl text-blue-600">
                <FaFacebook />
              </span>
              Continue with Facebook
            </div>

            <div className="border-t-1 border-t-gray-300 mt-5">
              <p>
                Don't have an account?
                <Link href="/sign-up" className="text-red-500">
                  Sign up
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default Login;
