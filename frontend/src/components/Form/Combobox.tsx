import { ElementType, ForwardedRef, ReactNode, forwardRef } from "react";
import {
  Combobox,
  ComboboxInputProps,
  ComboboxOptionProps,
} from "@headlessui/react";
import { XMarkIcon } from "@heroicons/react/24/outline";

import { InputField, InputFieldProps } from ".";
import { Card } from "../Elements";

export { Combobox };

export const ComboboxInput = <T,>(
  props: ComboboxInputProps<ElementType, T> & InputFieldProps
) => {
  return <Combobox.Input {...props} as={InputField} />;
};

type OptionsType = {
  onClose: () => void;
  children: ReactNode;
};
const Options = forwardRef(
  (
    { onClose, children, ...props }: OptionsType,
    ref: ForwardedRef<HTMLUListElement>
  ) => {
    return (
      <Card className="relative" {...props}>
        <div
          className="p-2 cursor-pointer absolute top-1 right-4"
          onClick={onClose}
        >
          <XMarkIcon className="size-6" />
        </div>
        <ul ref={ref}>{children}</ul>
      </Card>
    );
  }
);

export const ComboboxOptions = (props: OptionsType) => {
  return <Combobox.Options as={Options} {...props} />;
};

export const ComboboxOption = <T,>(
  props: ComboboxOptionProps<ElementType, T>
) => {
  return (
    <Combobox.Option className="cursor-pointer hover:bg-gray-100" {...props} />
  );
};
