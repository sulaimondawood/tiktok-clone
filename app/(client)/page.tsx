import SideBar from "@/components/sidebar/SideBar";
import axios from "axios";

export default async function Home() {
  const data = await axios.get("http://localhost:3000/api/getData");
  console.log(data);

  return (
    <main className="">
      <h1>Mian</h1>
    </main>
  );
}
