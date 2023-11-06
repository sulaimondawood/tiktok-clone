import { client } from "@/sanity/lib/client";
import { Dispatch, SetStateAction } from "react";
import { shuffleUser } from "./shuffleUsers";

export const getUsers = async (setUsers: Dispatch<SetStateAction<any[]>>) => {
  const res = await client.fetch(`*[_type == "user"]{
      _id,
      userName,
      image,
      _type
    }`);
  setUsers(shuffleUser(res, 5));
  //   setUsers(res);
};

export const URL = process.env.NEXT_PUBLIC_URL;
