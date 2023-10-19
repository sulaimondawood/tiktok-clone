interface userType {
  image: string;
  userName: string;
  _id: string;
  _type?: string;
}

interface userComment {
  comment: string;
  userPosted: {
    _ref: string;
    _type: string;
  };
}
