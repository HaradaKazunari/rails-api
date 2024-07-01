import clsx from "clsx";
import * as React from "react";
import { FieldError } from "react-hook-form";

type FieldWrapperProps = {
  label?: string;
  className?: string;
  children: React.ReactNode;
  error?: FieldError | undefined;
  description?: string;
  leftAddon?: React.ReactNode;
};

export type FieldWrapperPassThroughProps = Omit<
  FieldWrapperProps,
  "className" | "children"
>;

export const FieldWrapper = (props: FieldWrapperProps) => {
  const { label, className, error, leftAddon, children } = props;
  return (
    <div>
      <label
        className={clsx("block text-sm font-medium text-gray-700", className)}
      >
        {label}
        <div className="mt-1 flex items-center">
          {leftAddon && <div>{leftAddon}</div>}
          {children}
        </div>
      </label>
      {error?.message && (
        <div
          role="alert"
          aria-label={error.message}
          className="text-sm font-semibold text-red-500"
        >
          {error.message}
        </div>
      )}
    </div>
  );
};
