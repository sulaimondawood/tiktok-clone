import VideoCard from "@/components/videocard/VideoCard";
import { Post } from "@/types/posts";

export default async function Home() {
  const data = await fetch("http://localhost:3000/api/getData", {
    cache: "no-store",
  });
  const res = await data.json();

  return (
    <main className="w-full max-w-3xl  mx-auto ml-[60px] sm:ml-[80px] md:ml-[100px] lg:ml-[370px]">
      {res.map((data: any, index: any) => {
        return (
          <div key={index}>
            <VideoCard post={data} />
          </div>
        );
      })}
    </main>
  );
}
