import { Button } from "@/components/Elements";
import { Form, InputField, SelectField } from "@/components/Form";

import { CreateContractDTO, useCreateContract } from "../api";
import { InputContract } from "../types";

import { getValidateRule } from "@/utils/validate";
import { ProjectDetailsForm } from "@/features/projectDetails";

import { useCharges } from "@/features/charges";
import { useClients } from "@/features/clients";
import { addClientCompanyName, formatQueryOption } from "@/utils/options";

const schema = getValidateRule([
  "project_name",
  "charge_id",
  "delivery_schedule_date",
  "invoice_schedule_date",
  "order_no",
  "project_detail",
]);

type CreateContractProps = {
  onSuccess?: () => void;
};

export const CreateContractForm = ({ onSuccess }: CreateContractProps) => {
  const createContractMutation = useCreateContract();
  const chargesQuery = useCharges();
  const clientsQuery = useClients();

  return (
    <>
      <div className="my-4">
        <h2 className="text-lg font-semibold text-gray-900">受注情報</h2>
      </div>
      <Form<CreateContractDTO["data"], typeof schema>
        id="create-Contract"
        onSubmit={(values) => {
          createContractMutation
            .mutateAsync({
              data: values,
            })
            .then(() => {
              onSuccess && onSuccess();
            });
        }}
        schema={schema}
      >
        {({ register, formState, control, watch }) => (
          <>
            <div className="flex gap-4">
              <InputField
                label="案件名"
                error={formState.errors["project_name"]}
                registration={register("project_name")}
              />
              <SelectField
                label="担当者"
                error={formState.errors["charge_id"]}
                registration={register("charge_id")}
                options={formatQueryOption({
                  query: chargesQuery,
                  value_key: "charge_id",
                  label_key: "charge_name",
                }).map((option) =>
                  addClientCompanyName({ option, clientsQuery, chargesQuery })
                )}
              />
            </div>
            <div className="flex gap-4">
              <InputField
                label="納品予定日"
                error={formState.errors["delivery_schedule_date"]}
                registration={register("delivery_schedule_date")}
                type="date"
                max="9999-12-31"
              />
              <InputField
                label="請求予定日"
                error={formState.errors["invoice_schedule_date"]}
                registration={register("invoice_schedule_date")}
                type="date"
                max="9999-12-31"
              />
              <InputField
                label="注番"
                error={formState.errors["order_no"]}
                registration={register("order_no")}
              />
            </div>
            <div className="my-4">
              <h2 className="text-lg font-semibold text-gray-900">受注明細</h2>
            </div>
            <ProjectDetailsForm<InputContract>
              register={register}
              formState={formState}
              watch={watch}
              control={control}
            />
            <div className="flex justify-center !mt-32">
              <Button
                isLoading={createContractMutation.isPending}
                type="submit"
                className="w-fit"
              >
                登録
              </Button>
            </div>
          </>
        )}
      </Form>
    </>
  );
};
