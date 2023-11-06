"use client";

import { VideoSkeleton } from "@/components/skeletons/Skeleton";
import VideoCard from "@/components/videocard/VideoCard";
import { client } from "@/sanity/lib/client";
import { Post } from "@/types/posts";
import { URL } from "@/utils/constants/getUsers";
import { useEffect, useState } from "react";

export default async function Page() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  async function getPosts() {
    const query = `*[_type == "post"]{
    _id,
     caption,
       video{
        asset->{
          _id,
          url
        }
      },
      userId,
      userPosted->,
    likes,
    comments[]{
      comment,
      _key,
 
    },
    topic
    
  } `;

    const res = await client.fetch(query);
    console.log(res);
    setPosts(res);
    setLoading(false);
  }
  useEffect(() => {
    getPosts();
  }, []);
  return (
    <main className="w-full px-3 md:px-0 max-w-3xl  mx-auto ml-[60px] sm:ml-[80px] md:ml-[100px] lg:ml-[270px] xl:ml-[370px]">
      {loading
        ? [1, 2, 3, 4, 5].map((item, index) => {
            return <VideoSkeleton key={index} />;
          })
        : posts.map((data: Post, index: any) => {
            return <VideoCard key={index} post={data} />;
          })}
    </main>
  );
}

// import VideoCard from "@/components/videocard/VideoCard";
// import { Post } from "@/types/posts";

// export default async function Page() {
//   const data = await fetch("http://localhost:3000/api/random-data", {
//     cache: "no-store",
//   });
//   const res = await data.json();
//   // console.log(res);

//   return (
//     <main className="w-full max-w-3xl  mx-auto ml-[60px] sm:ml-[80px] md:ml-[100px] lg:ml-[270px] xl:ml-[370px]">
//       {res.map((data: any, index: any) => {
//         return (
//           <div key={index}>
//             <VideoCard post={data} />
//           </div>
//         );
//       })}
//     </main>
//   );
// }
