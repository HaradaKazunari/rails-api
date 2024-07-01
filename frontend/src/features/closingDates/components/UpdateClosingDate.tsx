import dayjs from "dayjs";
import { Button } from "@/components/Elements";
import { Authorization, ROLES } from "@/lib/authorization";
import { DATE_FORMATE } from "@/config";

import { useUpdateClosingDate } from "../api";

export const UpdateClosingDate = ({
  closing_date_id,
  disabled = false,
}: {
  closing_date_id: string;
  disabled?: boolean;
}) => {
  const updateClosingDateMutation = useUpdateClosingDate();

  return (
    <Authorization allowedRoles={[ROLES.ADMIN]}>
      <Button
        size="sm"
        disabled={disabled}
        onClick={() => {
          updateClosingDateMutation.mutate({
            closing_date_id,
            closing_fixed_date: dayjs().format(DATE_FORMATE),
          });
        }}
      >
        確定
      </Button>
    </Authorization>
  );
};
