import { BaseEntity } from "@/types";

export type Estimate = {
  estimate_id: string;
  project_id: string;
} & InputEstimate &
  BaseEntity;

export type InputEstimate = {
  accrual_place: string;
  accrual_date: Date;
  estimate_validity_period: string;
  deadline: string;
  delivery_place: string;
  transaction_condition: string;
};
