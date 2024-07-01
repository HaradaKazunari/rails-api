import { UseFormRegisterReturn } from "react-hook-form";

import { FieldWrapper, FieldWrapperPassThroughProps } from "./FieldWrapper";
import { Checkbox } from "../Elements";

const variants = {
  primary: "checked:bg-blue-600 checked:border-blue-600",
};

const sizes = {
  md: {
    box: "h-5 w-5 ",
    icon: "h-3.5 w-3.5",
  },
};

type CheckboxFieldProps = FieldWrapperPassThroughProps & {
  variant?: keyof typeof variants;
  size?: keyof typeof sizes;
  registration: Partial<UseFormRegisterReturn>;
};

export const CheckboxField = (props: CheckboxFieldProps) => {
  const {
    label,
    size = "md",
    variant = "primary",
    registration,
    error,
  } = props;
  return (
    <FieldWrapper label={label} error={error}>
      <Checkbox size={size} variant={variant} {...registration} />
    </FieldWrapper>
  );
};
