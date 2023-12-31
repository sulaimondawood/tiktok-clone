export default {
  name: "post",
  title: "Post",
  type: "document",
  fields: [
    {
      name: "caption",
      title: "Caption",
      type: "string",
    },
    {
      name: "video",
      title: "Video",
      type: "file",
      options: {
        hotspot: true,
      },
    },
    {
      name: "userId",
      title: "UserId",
      type: "string",
    },
    {
      name: "userPosted",
      title: "User Posted",
      type: "userPosted",
    },
    {
      name: "likes",
      title: "Likes",
      type: "array",
      of: [
        {
          type: "reference",
          to: [{ type: "user" }],
        },
      ],
    },
    {
      name: "comments",
      title: "Comments",
      type: "array",
      of: [
        {
          type: "object",
          name: "comments",
          fields: [
            {
              type: "string",
              name: "comment",
            },
            {
              name: "userPosted",
              type: "userPosted",
            },
          ],
        },
      ],
    },
    // {
    //   name: "comments",
    //   title: "Comments",
    //   type: "array",
    //   of: [{ type: "comment" }],
    // },
    {
      name: "topic",
      title: "Topic",
      type: "string",
    },
  ],
};
