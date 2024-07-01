import { BaseEntity } from "@/types";

export type ClosingDate = BaseEntity & {
  closing_ym: string;
  closing_fixed_date?: Date | null;
};
