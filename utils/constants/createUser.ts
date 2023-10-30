import { client } from "@/sanity/lib/client";
import useStore from "@/store/userStore/userStore";

// export const createUser = async (user: any) => {
//   const updateUser = useStore((state) => state.updateUser);

//   // export const createUser = async (user: any, updateUser: any) => {
//   // const data = {
//   //   _id: user.email,
//   //   _type: "user",
//   //   userName: user.name,
//   //   image: user.image,
//   // };
//   const data = {
//     email: user.email,
//     userName: user.name,
//     image: user.image,
//   };

//   const mutations = [
//     {
//       createIfNotExists: {
//         _id: user.email,
//         _type: "user",
//         userName: user.name,
//         image: user.image,
//       },
//     },
//   ];

//   fetch(
//     `https://${process.env.NEXT_PUBLIC_SANITY_PROJECT_ID}.api.sanity.io/v2023-08-16/data/mutate/${process.env.NEXT_PUBLIC_SANITY_DATASET}`,
//     // `https://${process.env.NEXT_PUBLIC_SANITY_PROJECT_ID}.api.sanity.io/v2021-06-07/data/mutate/${process.env.NEXT_PUBLIC_SANITY_DATASET}`,
//     {
//       method: "post",
//       headers: {
//         "Content-type": "application/json",
//         Authorization: `Bearer ${process.env.NEXT_PUBLIC_SANITY_WRITE_ACCESS}`,
//       },
//       body: JSON.stringify({ mutations }),
//     }
//   )
//     .then((response) => response.json())
//     .then((result) => console.log(result))
//     .catch((error) => console.error(error));

//   updateUser(data);
// };

// modified
export const createUser = async (user: any, updatedUser: any) => {
  try {
    const data = {
      _id: user.email,
      _type: "user",
      userName: user.name,
      image: user.image,
    };

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

    const response = await fetch(
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
    );

    if (response.ok) {
      const result = await response.json();
      updatedUser(data);
      console.log(result);
      return true; // Indicate success
    } else {
      throw new Error("Failed to create a user in Sanity");
    }
  } catch (error) {
    console.error("Error creating user:", error);
    return false; // Indicate failure
  }
};
