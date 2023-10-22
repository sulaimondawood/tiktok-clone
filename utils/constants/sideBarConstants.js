import { GoHome } from "react-icons/go";
import { GoHomeFill } from "react-icons/go";
import { BsPeopleFill } from "react-icons/bs";
import { BsPeople } from "react-icons/bs";
import { MdOutlineExplore } from "react-icons/md";
import { MdExplore } from "react-icons/md";
import { RiLiveLine } from "react-icons/ri";
import { RiLiveFill } from "react-icons/ri";

export const sideBar = [
  {
    name: "For you",
    icon: <GoHome />,
    iconActive: <GoHomeFill />,
    route: "/",
  },
  {
    name: "Following",
    icon: <BsPeople />,
    iconActive: <BsPeopleFill />,
    route: "/following",
  },
  {
    name: "Explore",
    icon: <MdOutlineExplore />,
    iconActive: <MdExplore />,
    route: "/explore",
  },
  {
    name: "LIVE",
    icon: <RiLiveLine />,
    iconActive: <RiLiveFill />,
    route: "/live",
  },
];
