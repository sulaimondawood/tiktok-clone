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
  userPosted: any;
  likes: string[];
  comments: string[];
}
