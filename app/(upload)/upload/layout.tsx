import Button from "@/components/button/Button";
import React from "react";
import "@/globals.css";
import UploadSideBar from "@/components/sidebar/UploadSideBar";

export default function UploadLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main className="flex">
      <UploadSideBar />
      <div className="max-w-[1440px]">{children}</div>
    </main>
  );
}
