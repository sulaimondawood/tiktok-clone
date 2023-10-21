"use client";
import { useState, useEffect } from "react";
import { sideBar } from "@/utils/constants/sideBarConstants";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { getUsers } from "@/utils/constants/getUsers";
import { shuffleUser } from "@/utils/constants/shuffleUsers";

const SideBar = () => {
  const [users, setUsers] = useState<any[]>([]);
  const [shuffledUsers, setShuffledUsers] = useState<any[]>([]);
  const [isLoading, setLoading] = useState(true);
  const router = useRouter();
  const pathName = usePathname();

  useEffect(() => {
    getUsers(setUsers);
    console.log(users);

    setLoading(false);
  }, []);
  return (
    <div className="lg:w-[250px] h-screen px-4 overflow-y-hidden fixed mt-5 z-50">
      <div className="flex flex-col items-start py-6 border-b border-b-gray-300 justify-center gap-6">
        {sideBar.map((item, index) => {
          return (
            <Link
              href={item.route}
              key={index}
              className="flex gap-2 text-base font-semibold items-center hover:bg-gray-50 hover:rounded-md hover:w-full hover:py-2"
            >
              <span
                className={`text-3xl ${
                  item.route === pathName ? "text-red-600" : ""
                }`}
              >
                {item.route === pathName ? item.iconActive : item.icon}
              </span>
              <p
                className={` hidden lg:block text-lg ${
                  item.route === pathName ? "text-red-600" : ""
                }`}
              >
                {item.name}
              </p>
            </Link>
          );
        })}
      </div>
      <div className="py-4 flex flex-col gap-4 items-start justify-center">
        <p className="text-gray-400 text-sm">Following Accounts</p>

        {!isLoading
          ? users.map((item: userType, index) => {
              return (
                <Link
                  href={`/profile/${item._id}`}
                  key={index}
                  className="flex item-center gap-4"
                >
                  <img
                    className="w-10 h-10 rounded-full"
                    src={item.image}
                    alt="user image"
                  />
                  <div className="">
                    <p className="font-semibold">
                      {item.userName.replaceAll(" ", "").toLowerCase()}
                    </p>
                    <p className="text-xs text-gray-500">{item.userName}</p>
                  </div>
                </Link>
              );
            })
          : "loading"}
      </div>
    </div>
  );
};

export default SideBar;
