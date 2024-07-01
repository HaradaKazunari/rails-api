import clsx from "clsx";
import { ForwardedRef, forwardRef } from "react";

const variants = {
  primary: "checked:bg-blue-600 checked:border-blue-600",
};

const sizes = {
  md: {
    box: "h-5 w-5 ",
    icon: "h-3.5 w-3.5",
  },
};

export type CheckboxProps = {
  variant?: keyof typeof variants;
  size?: keyof typeof sizes;
  disabled?: boolean;
  defaultChecked?: boolean;
};

export const CheckboxElem = (
  {
    size = "md",
    variant = "primary",
    defaultChecked = false,
    ...props
  }: CheckboxProps,
  ref: ForwardedRef<HTMLInputElement>,
) => {
  return (
    <div className="inline-flex items-center">
      <div className="relative flex items-center p-3 rounded-full cursor-pointer">
        <input
          ref={ref}
          type="checkbox"
          className={clsx([
            "before:content[''] before:absolute before:top-2/4 before:left-2/4 before:block before:h-12 before:w-12 before:-translate-y-2/4 before:-translate-x-2/4 before:rounded-full before:bg-blue-gray-500 before:opacity-0 before:transition-opacity",
            "checked:before:bg-gray-900 hover:before:opacity-10",
            "peer relative cursor-pointer appearance-none rounded-md border border-blue-gray-200 transition-all",
            sizes[size].box,
            variants[variant],
          ])}
          defaultChecked={defaultChecked}
          {...props}
        />
        <span className="absolute text-white transition-opacity opacity-0 pointer-events-none top-2/4 left-2/4 -translate-y-2/4 -translate-x-2/4 peer-checked:opacity-100">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className={clsx(sizes[size].icon)}
            viewBox="0 0 20 20"
            fill="currentColor"
            stroke="currentColor"
            strokeWidth="1"
          >
            <path
              fillRule="evenodd"
              d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
              clipRule="evenodd"
            ></path>
          </svg>
        </span>
      </div>
    </div>
  );
};
export const Checkbox = forwardRef(CheckboxElem);
