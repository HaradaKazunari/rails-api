import * as React from "react";
import { TrashIcon } from "@heroicons/react/24/solid";
import {
  InputField,
  SelectField,
  Combobox,
  ComboboxInput,
  ComboboxOptions,
  ComboboxOption,
} from "@/components/Form";

import { formatVersatilityOption } from "@/utils/options";
import { useVersatilitys } from "@/features/versatility";
import { getAmountPrice } from "../../helper";
import {
  FieldValues,
  UseFormRegister,
  UseFormWatch,
  FormState,
  UseFieldArrayUpdate,
  ArrayPath,
  Path,
  FieldArray,
} from "react-hook-form";
import { ProjectDetail, useProjectDetails } from "../..";

export type DTO<T> = T;

export type FormProps<T extends FieldValues> = {
  register: UseFormRegister<DTO<T>>;
  formState: FormState<DTO<T>>;
  watch: UseFormWatch<DTO<T>>;
};

type Props<T extends FieldValues> = FormProps<T> & {
  fields: FieldValues;
  onRemove: (i: number) => void;
  update: UseFieldArrayUpdate<DTO<T>, ArrayPath<DTO<T>>>;
};

export const Form = <T extends FieldValues>({
  register,
  fields,
  formState,
  watch,
  onRemove,
  update,
}: Props<T>) => {
  const projectDetailQuery = useProjectDetails();
  const [focusIndex, setFocusIndex] = React.useState(-1);

  const getDetailById = (id: string): ProjectDetail | null => {
    if (!projectDetailQuery.data) return null;
    return projectDetailQuery.data.find((d) => d.id === id) || null;
  };

  // @ts-ignore
  const watchProjectDetail = watch("project_detail");

  const versatilityQuery = useVersatilitys({
    params: {
      identify_code: "UNIT",
    },
  });

  const getSuggestOptions = ({
    product_name = "",
    model_name = "",
  }: ProjectDetail): ProjectDetail[] => {
    if (!product_name) return [];

    return (
      projectDetailQuery.data
        ?.filter((d) => d.product_name.includes(product_name))
        .filter((d) =>
          model_name && d.model_name ? d.model_name.includes(model_name) : true
        ) || []
    );
  };

  return (
    <>
      <div className="grid grid-cols-11 gap-4 mt-4">
        <div className="col-span-2 w-full text-center">製品名</div>
        <div className="col-span-2 w-full text-center">型番</div>
        <div className="w-full text-center">数量</div>
        <div className="w-full text-center">単位</div>
        <div className="w-full text-center">単価</div>
        <div className="w-full text-center">金額</div>
        <div className="col-span-2 w-full text-center">備考</div>
        <div className="opacity-0">削除</div>
      </div>
      <div className="flex flex-col gap-2">
        {fields.map((field: ProjectDetail, i: number) => {
          const keys = Object.keys(field);
          // @ts-ignore
          const errorForField = formState?.errors?.project_detail?.[i];
          return (
            <div key={i + keys.join("")}>
              <Combobox
                value={field}
                onChange={(selected: ProjectDetail) => {
                  if (selected) {
                    const detail = getDetailById(selected.id);
                    if (detail)
                      update(i, detail as FieldArray<T, ArrayPath<T>>);
                  }
                  setFocusIndex(-1);
                }}
              >
                <div
                  className="grid grid-cols-11 gap-4"
                  key={i + keys.join("")}
                >
                  <div className="col-span-2">
                    <ComboboxInput
                      registration={register(
                        `project_detail.${i}.product_name` as Path<T>
                      )}
                      error={errorForField?.product_name}
                      displayValue={(detail: ProjectDetail) =>
                        detail.product_name
                      }
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                        update(i, {
                          ...field,
                          product_name: e.target.value,
                        } as FieldArray<T, ArrayPath<T>>)
                      }
                      onFocus={() => setFocusIndex(i)}
                    />
                  </div>
                  <div className="col-span-2">
                    <ComboboxInput
                      className="col-span-2"
                      registration={register(
                        `project_detail.${i}.model_name` as Path<T>
                      )}
                      error={errorForField?.model_name}
                      displayValue={(detail: ProjectDetail) =>
                        detail.model_name
                      }
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                        update(i, {
                          ...field,
                          model_name: e.target.value,
                        } as FieldArray<T, ArrayPath<T>>)
                      }
                      onFocus={() => setFocusIndex(i)}
                    />
                  </div>
                  <InputField
                    key={field.id + "amount"}
                    type="number"
                    error={errorForField?.amount}
                    registration={register(
                      `project_detail.${i}.amount` as Path<T>,
                      {
                        valueAsNumber: true,
                      }
                    )}
                  />
                  <SelectField
                    className="pr-2"
                    key={field.id + "amount_unit"}
                    error={errorForField?.amount_unit}
                    registration={register(
                      `project_detail.${i}.amount_unit` as Path<T>
                    )}
                    options={formatVersatilityOption(versatilityQuery)}
                  />
                  <InputField
                    key={field.id + "unit_price"}
                    type="number"
                    error={errorForField?.unit_price}
                    registration={register(
                      `project_detail.${i}.unit_price` as Path<T>,
                      {
                        valueAsNumber: true,
                      }
                    )}
                  />
                  <div className="flex justify-center items-center">
                    {getAmountPrice(watchProjectDetail[i])}
                  </div>
                  <div className="col-span-2">
                    <InputField
                      key={field.id + "remarks"}
                      error={errorForField?.remarks}
                      registration={register(
                        `project_detail.${i}.remarks` as Path<T>
                      )}
                    />
                  </div>

                  <div
                    className="cursor-pointer flex justify-center items-center"
                    onClick={() => onRemove(i)}
                    role="delete"
                  >
                    <TrashIcon className="size-6 text-gray-500" />
                  </div>
                </div>
                {getSuggestOptions(field).length > 0 && focusIndex === i && (
                  <ComboboxOptions onClose={() => setFocusIndex(-1)}>
                    <ComboboxOption<ProjectDetail> value={field}>
                      <div className="grid grid-cols-8 gap-4">
                        <span>{field.product_name}</span>
                        <span>{field.model_name}</span>
                      </div>
                    </ComboboxOption>
                    {getSuggestOptions(field).map((suggest) => (
                      <ComboboxOption<ProjectDetail>
                        key={suggest.id}
                        value={suggest}
                        className="cursor-pointer hover:bg-gray-100"
                      >
                        <div className="grid grid-cols-8 gap-4">
                          <span>{suggest.product_name}</span>
                          <span>{suggest.model_name}</span>
                        </div>
                      </ComboboxOption>
                    ))}
                  </ComboboxOptions>
                )}
              </Combobox>
            </div>
          );
        })}
      </div>
    </>
  );
};
