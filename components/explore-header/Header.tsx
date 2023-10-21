import { sideBar } from "@/utils/constants/sideBarConstants";
import topics from "@/utils/constants/topics";
import Link from "next/link";
import { useParams, useRouter, useSearchParams } from "next/navigation";
import React, { Dispatch, SetStateAction, useState } from "react";

const Header = ({
  setTopic,
}: {
  setTopic: Dispatch<SetStateAction<string>>;
}) => {
  const router = useSearchParams();
  console.log(router.get("topic"));

  const handleQuery = (topic: string) => {
    setTopic(topic);
  };

  return (
    <div className="flex gap-4 items-center justify-center">
      {topics.map((topic: { id: number; name: string }) => {
        return (
          <Link
            onClick={() => handleQuery(topic.name)}
            href={`/explore/?topic=${topic.name}`}
            key={topic.id}
            className="text-black bg-gray-100"
          >
            {topic.name}
          </Link>
        );
      })}
    </div>
  );
};

export default Header;

function ExploreCard() {
  return <></>;
}
