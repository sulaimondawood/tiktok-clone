import SideBar from "@/components/sidebar/SideBar";
import VideoCard from "@/components/videocard/VideoCard";
import axios from "axios";

export default async function Home() {
  const data = await axios.get("http://localhost:3000/api/getData");

  return (
    <main className="w-full max-w-2xl  mx-auto">
      <VideoCard post={data.data} />
    </main>
  );
}
