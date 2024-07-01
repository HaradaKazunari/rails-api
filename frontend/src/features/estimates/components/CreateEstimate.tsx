import { Button } from "@/components/Elements";
import { Form, InputField, SelectField } from "@/components/Form";
import { Authorization, ROLES } from "@/lib/authorization";

import { CreateEstimateDTO, useCreateEstimate } from "../api/createEstimate";

import { getValidateRule } from "@/utils/validate";
import { ProjectDetailsForm } from "@/features/projectDetails";
import { Charge, useCharges } from "@/features/charges";
import { useClients } from "@/features/clients";
import { addClientCompanyName, formatQueryOption } from "@/utils/options";

const schema = getValidateRule([
  "project_name",
  "charge_id",
  "accrual_date",
  "accrual_place",
  "estimate_validity_period",
  "deadline",
  "delivery_place",
  "transaction_condition",
  "project_detail",
]);

type CreateEstimateProps = {
  onSuccess: () => void;
};

export const CreateEstimateForm = ({ onSuccess }: CreateEstimateProps) => {
  const createEstimateMutation = useCreateEstimate();

  const chargesQuery = useCharges();
  const clientsQuery = useClients();

  return (
    <Authorization allowedRoles={[ROLES.ADMIN]}>
      <div className="my-4">
        <h2 className="text-lg font-semibold text-gray-900">見積情報</h2>
      </div>
      <Form<CreateEstimateDTO["data"], typeof schema>
        id="create-Estimate"
        onSubmit={(values) => {
          createEstimateMutation
            .mutateAsync({
              data: values,
            })
            .then(() => {
              onSuccess();
            });
        }}
        schema={schema}
      >
        {({ register, formState, ...formProps }) => (
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
                options={formatQueryOption<Charge>({
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
                label="発生日"
                type="date"
                max="9999-12-31"
                error={formState.errors["accrual_date"]}
                registration={register("accrual_date")}
              />
              <InputField
                label="発生場所"
                error={formState.errors["accrual_place"]}
                registration={register("accrual_place")}
              />
            </div>
            <InputField
              label="見積有効期限"
              className="!w-1/3"
              error={formState.errors["estimate_validity_period"]}
              registration={register("estimate_validity_period")}
            />
            <div className="flex gap-4">
              <InputField
                label="納期"
                error={formState.errors["deadline"]}
                registration={register("deadline")}
              />
              <InputField
                label="納入場所"
                error={formState.errors["delivery_place"]}
                registration={register("delivery_place")}
              />
            </div>
            <InputField
              label="取引条件"
              className="!w-1/3"
              error={formState.errors["transaction_condition"]}
              registration={register("transaction_condition")}
            />
            <div className="my-4">
              <h2 className="text-lg font-semibold text-gray-900">見積明細</h2>
            </div>
            <ProjectDetailsForm
              register={register}
              formState={formState}
              {...formProps}
            />
            <div className="flex justify-center !mt-32">
              <Button
                isLoading={createEstimateMutation.isPending}
                type="submit"
                className="w-fit"
              >
                登録
              </Button>
            </div>
          </>
        )}
      </Form>
    </Authorization>
  );
};
