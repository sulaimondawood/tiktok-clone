import VideoCard from "@/components/videocard/VideoCard";
import { Post } from "@/types/posts";

export default async function Page() {
  const data = await fetch("http://localhost:3000/api/getData", {
    cache: "no-store",
  });
  const res = await data.json();

  return (
    <main className="w-full px-3 md:px-0 max-w-3xl  mx-auto ml-[60px] sm:ml-[80px] md:ml-[100px] lg:ml-[270px] xl:ml-[370px]">
      {res.map((data: any, index: any) => {
        return <VideoCard key={index} post={data} />;
      })}
    </main>
  );
}
