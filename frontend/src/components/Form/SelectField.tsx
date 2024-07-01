import clsx from "clsx";
import * as React from "react";
import { UseFormRegisterReturn } from "react-hook-form";

import { FieldWrapper, FieldWrapperPassThroughProps } from "./FieldWrapper";

export type Option = {
  label: React.ReactNode;
  value: string | number | string[];
};

type SelectFieldProps = FieldWrapperPassThroughProps & {
  options: Option[];
  className?: string;
  defaultValue?: string;
  placeholder?: string;
  registration: Partial<UseFormRegisterReturn>;
  onBlur?: () => void;
};

export const SelectField = (props: SelectFieldProps) => {
  const {
    label,
    options,
    error,
    className,
    defaultValue,
    registration,
    placeholder,
  } = props;
  return (
    <FieldWrapper label={label} error={error}>
      <select
        name="location"
        className={clsx(
          "block w-full h-5 box-content pl-3 pr-10 py-2 text-base border-gray-300 border focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md",
          className
        )}
        defaultValue={defaultValue}
        {...registration}
      >
        {options.map(({ label, value }) => (
          <option key={value?.toString()} value={value}>
            {!value && !label && placeholder ? placeholder : label}
          </option>
        ))}
      </select>
    </FieldWrapper>
  );
};
