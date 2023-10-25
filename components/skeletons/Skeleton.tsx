import React from "react";

export const UserSkeleton = (styles: string) => {
  return (
    <div className={styles}>
      <div className=""></div>
      <div className=""></div>
      <div className=""></div>
    </div>
  );
};
