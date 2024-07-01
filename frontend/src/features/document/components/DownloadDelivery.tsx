import { Button } from "@/components/Elements";
import { FormDialog, Form, InputField } from "@/components/Form";
import { Authorization, ROLES } from "@/lib/authorization";
import { getValidateRule } from "@/utils/validate";

import { useDownloadDelivery, DownloadDeliveryDTO } from "../api";

type DownloadDeliveryProps = {
  delivery_issued_date: string;
  project_id: string;
  disabled: boolean;
};

const schema = getValidateRule(["delivery_date"]);

export const DownloadDelivery = ({
  delivery_issued_date,
  project_id,
  disabled,
}: DownloadDeliveryProps) => {
  const downloadDeliveryMutate = useDownloadDelivery();

  return (
    <Authorization allowedRoles={[ROLES.ADMIN]}>
      <FormDialog
        isDone={downloadDeliveryMutate.isPending}
        title="納品書ダウンロード"
        triggerButton={
          <Button disabled={disabled} size="sm" variant="primary">
            納品書
            <br />
            ダウンロード
          </Button>
        }
        submitButton={
          <Button
            isLoading={downloadDeliveryMutate.isPending}
            type="submit"
            variant="primary"
            form="issue-invoice"
          >
            ダウンロード
          </Button>
        }
      >
        <Form<DownloadDeliveryDTO["data"], typeof schema>
          id="issue-invoice"
          onSubmit={(values) => {
            downloadDeliveryMutate.mutate({
              data: { ...values },
              project_id,
            });
          }}
          schema={schema}
          options={{
            defaultValues: {
              delivery_date: delivery_issued_date,
            },
          }}
        >
          {({ register, formState }) => (
            <>
              <div className="grid grid-cols-2 gap-4">
                <InputField
                  label="納品日"
                  type="date"
                  max="9999-12-31"
                  error={formState.errors["delivery_date"]}
                  registration={register("delivery_date")}
                />
              </div>
            </>
          )}
        </Form>
      </FormDialog>
    </Authorization>
  );
};
