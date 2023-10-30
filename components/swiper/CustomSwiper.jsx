import { useRef, useEffect } from "react";
import { useParams, useRouter, useSearchParams } from "next/navigation";
import topics from "@/utils/constants/topics";
import Link from "next/link";

import {
  BsFillArrowRightCircleFill,
  BsFillArrowLeftCircleFill,
} from "react-icons/bs";

import { AiOutlineArrowLeft, AiOutlineArrowRight } from "react-icons/ai";

import { register } from "swiper/element/bundle";
register(); // To register swiper custom element

export const CustomSwiper = ({ handleQuery }) => {
  const router = useSearchParams();
  const swiperRef = useRef(null);
  useEffect(() => {
    const swiperContainer = swiperRef.current;
    const params = {
      spaceBetween: "20",
      navigation: {
        prevEl: ".swiper-button-prev",
        nextEl: ".swiper-button-next",
      },
      slidesPerView: "auto",
      // breakpoints: {
      //   640: {
      //     slidesPerView: 4,
      //   },
      //   1024: {
      //     slidesPerView: 7,
      //   },
      // },
      freeMode: true,
      injectStyles: [
        `
 
       

        .swiper-button-next, .swiper-button-prev{

              position: absolute;
    top: 50%;
    transform: translate(-50%);

    background: white;
    padding: 10px;
    z-index: 99;
    border-radius: 50%;
    text-align: center;
    box-shadow: 2px 2px 5px #00000020
    background: white;

        }

        .swiper-button-prev{
    left: -20px;

        }
        .swiper-button-prev.swiper-button.disabled{
        visibility: hidden;
  
        }
        .swiper-button-next{
          right: -20px;
        }

        .swiper-button-next.swiper-button.disabled{
          visibility: hidden;
  
        }
        `,
      ],
    };
    Object.assign(swiperContainer, params);
    swiperContainer.initialize();
  }, []);

  return (
    <div className="my-6 relative">
      <button className="swiper-button-prev">
        <AiOutlineArrowLeft />
      </button>

      <swiper-container class="h-full" ref={swiperRef} init={false}>
        <swiper-slide
          class={`w-fit ${
            router.get("topic") === "" || !router.get("topic")
              ? "bg-black text-white"
              : "text-black bg-gray-100"
          }  px-4 py-2 rounded-md`}
        >
          <Link onClick={() => handleQuery("")} href={`/explore/?topic=${""}`}>
            All
          </Link>
        </swiper-slide>
        {topics.map((topic) => {
          return (
            <swiper-slide
              class={`w-fit ${
                router.get("topic") === topic.name
                  ? "bg-black text-white"
                  : "text-black bg-gray-100"
              }  px-4 py-2 rounded-md`}
            >
              <Link
                onClick={() => handleQuery(topic.name)}
                href={`/explore/?topic=${topic.name}`}
                key={topic.id}
                // className={`${
                //   router.get("topic") === topic.name
                //     ? "bg-black text-white"
                //     : "text-black bg-gray-100"
                // }  px-4 py-2 rounded-md`}
              >
                {topic.name}
              </Link>
            </swiper-slide>
          );
        })}
      </swiper-container>

      <button className="swiper-button-next">
        <AiOutlineArrowRight />
      </button>
    </div>
  );
};
