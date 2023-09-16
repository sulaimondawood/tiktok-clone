import { client } from "@/sanity/lib/client";
import axios from "axios";
import { v4 as uuidv4 } from "uuid";

export const createUser = async (user: any) => {
  const data = {
    _id: uuidv4(),
    _type: "user",
    userName: user.name,
    image: user.image,
  };

  console.log(user.name);
  console.log(uuidv4());

  const mutations = [
    {
      // createOrReplace: {
      createIfNotExists: {
        _id: uuidv4(),
        _type: "user",
        userName: user.name,
        image: user.image,
      },
    },
  ];

  fetch(
    `https://${process.env.NEXT_PUBLIC_SANITY_PROJECT_ID}.api.sanity.io/v2021-06-07/data/mutate/${process.env.NEXT_PUBLIC_SANITY_DATASET}`,
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

  // try {
  //   await fetch("http://localhost:3000/api/post/user", {
  //     method: "POST",
  //     headers: {
  //       "Content-Type": "application/json",
  //     },
  //     body: JSON.stringify(data),
  //   });
  // } catch (error) {
  //   console.log(error);
  // }
};
