import clsx from "clsx";
import * as React from "react";

type CardProps = {
  children: React.ReactNode;
  className?: string;
  head?: React.ReactNode;
};
export const Card = ({ head, children, className = "" }: CardProps) => {
  return (
    <div
      className={clsx(
        "w-full h-auth shadow-md rounded-md p-6 bg-white",
        className,
      )}
    >
      {head && (
        <h3 className="text-lg font-semibold text-gray-900 mb-4">{head}</h3>
      )}
      {children}
    </div>
  );
};
