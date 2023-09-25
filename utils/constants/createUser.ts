import { client } from "@/sanity/lib/client";
import useStore from "@/store/userStore/userStore";
import axios from "axios";
import { v4 as uuidv4 } from "uuid";

export const createUser = async (user: any, updateUser: any) => {
  const data = {
    _id: user.email,
    _type: "user",
    userName: user.name,
    image: user.image,
  };

  updateUser(data);
  const mutations = [
    {
      createIfNotExists: {
        _id: user.email,
        _type: "user",
        userName: user.name,
        image: user.image,
      },
    },
  ];

  fetch(
    `https://${process.env.NEXT_PUBLIC_SANITY_PROJECT_ID}.api.sanity.io/v2023-08-16/data/mutate/${process.env.NEXT_PUBLIC_SANITY_DATASET}`,
    // `https://${process.env.NEXT_PUBLIC_SANITY_PROJECT_ID}.api.sanity.io/v2021-06-07/data/mutate/${process.env.NEXT_PUBLIC_SANITY_DATASET}`,
    {
      method: "post",
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${process.env.NEXT_PUBLIC_SANITY_WRITE_ACCESS}`,
      },
      body: JSON.stringify({ mutations }),
    }
  )
    .then((response) => response.json())
    .then((result) => console.log(result))
    .catch((error) => console.error(error));
};
