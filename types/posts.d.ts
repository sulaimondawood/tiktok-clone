export interface Post {
  _id: string;
  caption: string;
  video: {
    asset: {
      _id: string;
      url: string;
    };
  };
  userId: string;
  postedBy: string;
  likes: string[];
  comments: string[];
}
