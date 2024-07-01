import { ProjectDetail } from "@/features/projectDetails";
import { BaseEntity } from "@/types";

export type Contract = {
  contract_id: string;
  project: string;
  delivery_issued_date: Date;
  invoice_issued_date: Date;
} & InputContract &
  BaseEntity;

export type InputContract = {
  project_name: string;
  charge_id: string;
  delivery_schedule_date: Date;
  invoice_schedule_date: Date;
  order_no: string;
  project_detail: ProjectDetail[];
};
