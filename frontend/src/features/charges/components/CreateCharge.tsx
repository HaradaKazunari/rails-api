import { PlusIcon } from "@heroicons/react/24/outline";

import { Button } from "@/components/Elements";
import { Form, FormDrawer, InputField } from "@/components/Form";

import { CreateChargeDTO, useCreateCharge } from "../api/createCharge";
import { getValidateRule } from "@/utils/validate";

const schema = getValidateRule(["charge_name", "email"]);

type CreateChargeType = {
  client_id: string;
  onSuccess?: () => void;
};
export const CreateCharge = ({
  client_id,
  onSuccess = () => {},
}: CreateChargeType) => {
  const createChargeMutation = useCreateCharge();

  return (
    <FormDrawer
      isDone={createChargeMutation.isSuccess}
      triggerButton={
        <Button size="sm" startIcon={<PlusIcon className="h-4 w-4" />}>
          担当者登録
        </Button>
      }
      title="担当者 登録"
      submitButton={
        <Button
          form="create-charge"
          type="submit"
          size="sm"
          isLoading={createChargeMutation.isPending}
        >
          登録
        </Button>
      }
    >
      <Form<CreateChargeDTO["data"], typeof schema>
        id="create-charge"
        onSubmit={(values) => {
          createChargeMutation
            .mutateAsync({
              data: { ...values, client: client_id },
            })
            .then(() => {
              onSuccess();
            });
        }}
        schema={schema}
      >
        {({ register, formState }) => (
          <>
            <InputField
              label="担当者"
              error={formState.errors["charge_name"]}
              registration={register("charge_name")}
            />
            <InputField
              label="Eメール"
              error={formState.errors["email"]}
              registration={register("email")}
            />
          </>
        )}
      </Form>
    </FormDrawer>
  );
};
