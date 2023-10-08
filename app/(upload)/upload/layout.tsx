import Button from "@/components/button/Button";
import React from "react";

export default function UploadLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="">
      <div className="flex">
        <div className="">
          {/* <Button color="gray" bg="gray">
            Upload
          </Button> */}
        </div>
        {children}
      </div>
    </div>
  );
}
