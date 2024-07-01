import dayjs from "dayjs";
import { Button } from "@/components/Elements";
import { Authorization, ROLES } from "@/lib/authorization";
import { DATE_FORMATE } from "@/config";

import { useCreateClosingDate } from "../api";

export const CreateClosingDate = ({
  closing_ym,
  disabled = false,
}: {
  closing_ym: string | Date;
  disabled?: boolean;
}) => {
  const createClosingDateMutation = useCreateClosingDate();

  return (
    <Authorization allowedRoles={[ROLES.ADMIN]}>
      <Button
        size="sm"
        disabled={disabled}
        onClick={() => {
          createClosingDateMutation.mutate({
            data: {
              closing_ym,
              closing_fixed_date: dayjs().format(DATE_FORMATE),
            },
          });
        }}
      >
        確定
      </Button>
    </Authorization>
  );
};
