"use client";

import React from "react";
import { sideBar } from "@/utils/constants/sideBarConstants";
import { usePathname, useRouter } from "next/navigation";
import Link from "next/link";

const UploadSideBar = () => {
  const pathName = usePathname();

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
    </div>
  );
};

export default UploadSideBar;
