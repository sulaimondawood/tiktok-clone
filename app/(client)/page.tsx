import { VideoSkeleton } from "@/components/skeletons/Skeleton";
import VideoCard from "@/components/videocard/VideoCard";
import { client } from "@/sanity/lib/client";
import { Post } from "@/types/posts";
import { URL } from "@/utils/constants/getUsers";
import { Suspense } from "react";
// import { useEffect, useState } from "react";
async function getPosts() {
  const res = await fetch(`${URL}/api/all-posts`, {
    cache: "no-store",
  });
  return res.json();
}
export default async function Home() {
  const posts = await getPosts();

  return (
    <>
      <Suspense fallback={<VideoSkeleton />}>
        <main className="w-full px-3 md:px-0 max-w-3xl  mx-auto ml-[60px] sm:ml-[80px] md:ml-[100px] lg:ml-[270px] xl:ml-[370px]">
          {posts.map((item: Post, index: number) => {
            return <VideoCard key={index} post={item} />;
          })}
        </main>
      </Suspense>
    </>
  );
}

// import { VideoSkeleton } from "@/components/skeletons/Skeleton";
// import VideoCard from "@/components/videocard/VideoCard";
// import { client } from "@/sanity/lib/client";
// import { Post } from "@/types/posts";
// import { useEffect, useState } from "react";

// export default async function Home() {
//   const [posts, setPosts] = useState<Post[]>([]);
//   const [loading, setLoading] = useState(true);
//   const [allPosts, setAllPosts] = useState<any>([]);
//   useEffect(() => {
//     async function fetchPosts() {
//       const query = `*[_type == "post"] | order(_createdAt desc){
//     _id,
//      caption,
//        video{
//         asset->{
//           _id,
//           url
//         }
//       },
//       userId,
//       userPosted->,
//     likes,
//     comments[]{
//       comment,
//       _key,

//     },
//     topic

//          } `;
//       const res = await client.fetch(query);
//       if (res) {
//         setPosts(res);
//         console.log("inside then res");
//         console.log(res);
//         console.log("inside then res");
//         console.log("inside then posts");
//         console.log(posts);
//         console.log("inside then posts");
//         setLoading(false);
//         console.log("loading");
//         console.log(loading);
//         console.log("loading");
//       }
//     }
//     fetchPosts();
//   }, []);

//   return (
//     <main className="w-full px-3 md:px-0 max-w-3xl  mx-auto ml-[60px] sm:ml-[80px] md:ml-[100px] lg:ml-[270px] xl:ml-[370px]">
//       {loading
//         ? [1, 2, 3, 4, 5].map((item, index) => {
//             return <VideoSkeleton key={index} />;
//           })
//         : posts.map((data: Post, index: any) => {
//             return <VideoCard key={index} post={data} />;
//           })}
//     </main>
//   );
// }
