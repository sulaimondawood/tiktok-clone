import React, { ReactNode } from "react";

const Button = ({
  children,
  color,
  bg,
}: {
  children: ReactNode;
  color: string;
  bg: string;
}) => {
  return (
    <div className={`text-${color}-700 bg-${bg}-300 rounded`}>{children}</div>
  );
};

export default Button;
