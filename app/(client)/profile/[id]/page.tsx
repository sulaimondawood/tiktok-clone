import ProfilePosts from "@/components/profile-posts/ProfilePosts";
import { ProfileSkeleton, UserSkeleton } from "@/components/skeletons/Skeleton";
import Tab from "@/components/tab/Tab";
import { Post } from "@/types/posts";
import { URL } from "@/utils/constants/getUsers";
import axios from "axios";
import Link from "next/link";
import { useParams, usePathname } from "next/navigation";
import React, { Suspense } from "react";
import { BsFillPlayFill } from "react-icons/bs";

interface IUserProfile {
  userProfile: {
    users: any[];
    userPosts: any[];
    userLikes: any[];
  };
}

async function getProfileData(slug: string) {
  const response = await fetch(`${URL}/api/profile/${slug}`, {
    cache: "no-store",
  });
  return await response.json();
}

const Profile = async ({ params }: { params: { id: string } }) => {
  const data = await getProfileData(params.id);

  return (
    <div className="w-[calc(100vw-80px)]  max-w-[calc(100vw-280px)] mx-auto ml-[60px] sm:ml-[80px] md:ml-[100px]  lg:ml-[250px] px-4 md:px-8">
      <Suspense
        fallback={
          <UserSkeleton
            imgStyles="w-12 h-12 md:w-24 md:h-24"
            text1Styles="h-[20px] w-[100px]"
            text2Styles="h-[15px] w-[80px]"
          />
        }
      >
        <div className="flex mt-8 gap-4 items-start md:items-start">
          <img
            className="rounded-full w-12 h-12 md:w-24 md:h-24"
            src={data?.user[0]?.image}
            alt="user image"
          />
          <div className="flex flex-col md:gap-1">
            <h1 className="font-semibold text-base sm:text-xl md:text-2xl">
              {data?.user[0]?.userName.replaceAll(" ", "").toLowerCase()}
            </h1>
            <p className="text-xs sm:text-base text-gray-600">
              {data?.user[0]?.userName}{" "}
            </p>
          </div>
        </div>
      </Suspense>

      <Suspense fallback={<ProfileSkeleton />}>
        <ProfilePosts data={data} />
      </Suspense>
    </div>
  );
};

export default Profile;
// "use client";

// import { ProfileSkeleton, UserSkeleton } from "@/components/skeletons/Skeleton";
// import Tab from "@/components/tab/Tab";
// import { Post } from "@/types/posts";
// import { URL } from "@/utils/constants/getUsers";
// import axios from "axios";
// import Link from "next/link";
// import { useParams, usePathname } from "next/navigation";
// import React, { useEffect, useRef, useState } from "react";
// import { BsFillPlayFill } from "react-icons/bs";
// interface IUserProfile {
//   userProfile: {
//     users: any[];
//     userPosts: any[];
//     userLikes: any[];
//   };
// }

// const Profile = () => {
//   const [userProfile, setProfile] = useState<any>(null);
//   const [isLoading, setLoaading] = useState(true);
//   const params = useParams();
//   const [tab, setTab] = useState(true);
//   const [hover, setHoverTab] = useState(false);
//   const [isAutoPlay, setAutoPlay] = useState(false);
//   const controlRef = useRef<HTMLVideoElement | null>(null);
//   // console.log(params);

//   async function getProfileData() {
//     const response = await fetch(`${URL}/api/profile/${params.id}`, {
//       cache: "no-store",
//     });
//     const data = await response.json();
//     // console.log(data);
//     setProfile(data);
//     setLoaading(false);
//   }

//   const handleHover = () => {
//     if (isAutoPlay) {
//       setAutoPlay(true);
//       // controlRef.current?.play();
//     } else {
//       setAutoPlay(false);
//       // controlRef.current?.pause();
//     }
//   };

//   useEffect(() => {
//     getProfileData();
//   }, []);

//   return (
//     <div className="w-[calc(100vw-80px)]  max-w-[calc(100vw-280px)] mx-auto ml-[60px] sm:ml-[80px] md:ml-[100px]  lg:ml-[250px] px-4 md:px-8">
//       {isLoading ? (
//         <UserSkeleton
//           imgStyles="w-12 h-12 md:w-24 md:h-24"
//           text1Styles="h-[20px] w-[100px]"
//           text2Styles="h-[15px] w-[80px]"
//         />
//       ) : (
//         <div className="flex mt-8 gap-4 items-start md:items-start">
//           <img
//             className="rounded-full w-12 h-12 md:w-24 md:h-24"
//             src={userProfile?.user[0]?.image}
//             alt="user image"
//           />
//           <div className="flex flex-col md:gap-1">
//             <h1 className="font-semibold text-base sm:text-xl md:text-2xl">
//               {userProfile?.user[0]?.userName.replaceAll(" ", "").toLowerCase()}
//             </h1>
//             <p className="text-xs sm:text-base text-gray-600">
//               {userProfile?.user[0]?.userName}{" "}
//             </p>
//           </div>
//         </div>
//       )}

//       <Tab tab={tab} setTab={setTab} text1="Videos" text2="Liked" />

//       <div className="flex w-[calc(100vw-80px)] md:w-[calc(100vw-100px)] lg:w-full flex-wrap gap-4 justify-start items-center">
//         {isLoading ? (
//           [1, 2, 3, 4, 5, 6].map((item, index) => {
//             return <ProfileSkeleton key={index} />;
//           })
//         ) : tab ? (
//           <>
//             {userProfile?.userPosts?.map((post: Post, index: number) => {
//               return (
//                 <div
//                   key={index}
//                   className=" relative bg-gray-200 w-full md:w-[200px] h-[250px] rounded-md"
//                 >
//                   <Link
//                     href={`/${post?.userPosted?.userName}/post/${post._id}`}
//                   >
//                     <video
//                       onMouseEnter={() => setAutoPlay(true)}
//                       onMouseLeave={() => setAutoPlay(false)}
//                       ref={controlRef}
//                       className="w-full h-full"
//                       autoPlay={isAutoPlay}
//                       loop
//                       muted
//                     >
//                       <source src={post?.video?.asset?.url}></source>
//                       Your browser does not support this video
//                     </video>
//                   </Link>
//                   <span className="absolute bottom-3 text-white text-xl z-50  left-4">
//                     <BsFillPlayFill />
//                   </span>
//                 </div>
//               );
//             })}
//           </>
//         ) : (
//           <>
//             {userProfile?.userLikes?.map((post: Post, index: number) => {
//               return (
//                 <div
//                   key={index}
//                   className=" relative bg-gray-200 w-full md:w-[200px] h-[250px] rounded-md"
//                 >
//                   <Link
//                     href={`/${post?.userPosted?.userName}/post/${post._id}`}
//                   >
//                     <video
//                       onMouseEnter={() => setAutoPlay(true)}
//                       onMouseLeave={() => setAutoPlay(false)}
//                       ref={controlRef}
//                       className="w-full h-full"
//                       autoPlay={isAutoPlay}
//                       loop
//                       muted
//                     >
//                       <source src={post?.video?.asset?.url}></source>
//                       Your browser does not support this video
//                     </video>
//                   </Link>
//                   <span className="absolute bottom-3 text-white text-xl z-50  left-4">
//                     <BsFillPlayFill />
//                   </span>
//                 </div>
//               );
//             })}
//           </>
//         )}
//       </div>
//     </div>
//   );
// };

// export default Profile;
