import NavBar from "@/components/navbar/NavBar";
import "@/globals.css";
import { Inter } from "next/font/google";
import SideBar from "@/components/sidebar/SideBar";
import { NextAuthProvider } from "@/components/provider/Provider";

// const inter = Inter({ subsets: ["latin"] });

// export const metadata = {
//   title: "DingDong --Built by Dawood",
//   description: "DingDong is a social media video sharing platform",
// };

export default function ClientLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    // <html lang="en">
    //   <body className={inter.className}>
    // {/* <NextAuthProvider> */}
    <>
      <NavBar />
      <div className="flex ">
        <SideBar />
        <div className="max-w-[1440px] mx-auto overflow-x-hidden">
          {children}
        </div>
      </div>
    </>
    // {/* </NextAuthProvider> */}
    //   </body>
    // </html>
  );
}
