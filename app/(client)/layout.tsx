import NavBar from "@/components/navbar/NavBar";
import "@/globals.css";
import SideBar from "@/components/sidebar/SideBar";

export default function ClientLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <NavBar />
      <div className="flex ">
        <SideBar />
        <div className="max-w-[1440px] mx-auto overflow-x-hidden">
          {children}
        </div>
      </div>
    </>
  );
}
