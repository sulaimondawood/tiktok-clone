import SideBar from "@/components/sidebar/SideBar";
import VideoCard from "@/components/videocard/VideoCard";
import axios from "axios";

export default async function Home() {
  const data = await axios.get("http://localhost:3000/api/getData");
  console.log(data.data);

  return (
    <main className="w-full max-w-2xl  mx-auto">
      {data.data.map((data: any, index: any) => {
        return (
          <div key={index}>
            <VideoCard post={data} />
          </div>
        );
      })}
    </main>
  );
}
