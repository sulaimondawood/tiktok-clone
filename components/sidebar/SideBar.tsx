"use client";

import { sideBar } from "@/utils/constants/sideBarConstants";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";

const SideBar = () => {
  const router = useRouter();
  const pathName = usePathname();

  return (
    <div className="lg:w-[250px] h-screen px-4 pt-10 sticky top-0 left-0 -z-50">
      <div className=""></div>
      <div className="flex flex-col items-start py-6 border-b border-b-gray-300 justify-center gap-6">
        {sideBar.map((item, index) => {
          return (
            <Link
              href={item.route}
              key={index}
              className="flex gap-2 text-base font-semibold items-center hover:bg-gray-50 hover:rounded-md hover:w-full hover:py-2 "
            >
              <span
                className={`text-2xl ${
                  item.route === pathName ? "text-red-600" : ""
                }`}
              >
                {item.route === pathName ? item.iconActive : item.icon}
              </span>
              <p
                className={` hidden lg:block ${
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

export default SideBar;
