import { Ref, forwardRef } from "react";
import clsx from "clsx";
import { UseFormRegisterReturn } from "react-hook-form";

import { FieldWrapper, FieldWrapperPassThroughProps } from "./FieldWrapper";

export type InputFieldProps = FieldWrapperPassThroughProps & {
  type?: "text" | "email" | "password" | "date" | "tel" | "month" | "number";
  className?: string;
  registration: Partial<UseFormRegisterReturn>;
  max?: string | number;
  min?: string | number;
  onFocus?: () => void;
  defaultValue?: string;
};

export const InputField = forwardRef(
  (props: InputFieldProps, ref: Ref<HTMLInputElement>) => {
    const {
      type = "text",
      label,
      className,
      registration,
      error,
      leftAddon,
      ...inputProps
    } = props;
    return (
      <FieldWrapper label={label} error={error} leftAddon={leftAddon}>
        <input
          ref={ref}
          type={type}
          className={clsx(
            "appearance-none block w-full h-5 box-content px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm",
            className
          )}
          {...registration}
          {...inputProps}
        />
      </FieldWrapper>
    );
  }
);
