import * as React from "react";
import { Form, InputField, CheckboxField } from "@/components/Form";
import { Button } from "@/components/Elements";

import { Project } from "..";
import dayjs from "dayjs";

export type ProjectFilterDTO = {
  project_name: string;
  client_name: string;
  min_delivery_schedule_date: Date | null;
  max_delivery_schedule_date: Date | null;
  is_delivered: boolean | null;
  is_issued: boolean | null;
};

export const useProjectFilter = () => {
  const [filterValue, setFilterValue] = React.useState<ProjectFilterDTO>({
    project_name: "",
    client_name: "",
    min_delivery_schedule_date: null,
    max_delivery_schedule_date: null,
    is_delivered: null,
    is_issued: null,
  });

  const filterTerms = {
    project_name: (target: Project) => {
      return target.project_name.match(filterValue.project_name);
    },
    client_name: (target: Project) => {
      return target.client_name.match(filterValue.client_name);
    },
    min_delivery_schedule_date: (target: Project) => {
      if (!filterValue.min_delivery_schedule_date) return true;
      return (
        dayjs(target.delivery_schedule_date) >
        dayjs(filterValue.min_delivery_schedule_date)
      );
    },
    max_delivery_schedule_date: (target: Project) => {
      if (!filterValue.max_delivery_schedule_date) return true;
      return (
        dayjs(target.delivery_schedule_date) <
        dayjs(filterValue.max_delivery_schedule_date)
      );
    },
    is_delivered: (target: Project) => {
      if (!filterValue.is_delivered) return true;
      return target.delivery_issued_date ? true : false;
    },
    is_issued: (target: Project) => {
      if (!filterValue.is_issued) return true;
      return target.invoice_issued_date ? true : false;
    },
  };

  const FilterForm = () => {
    return (
      <Form<ProjectFilterDTO>
        id="filter-project"
        options={{ defaultValues: filterValue }}
        onSubmit={setFilterValue}
      >
        {({ register }) => (
          <>
            <div className="flex gap-6">
              <InputField
                label="案件名"
                registration={register("project_name")}
              />
              <InputField
                label="取引先名"
                registration={register("client_name")}
              />
            </div>
            <div className="flex gap-6 items-center">
              <div className="flex items-end gap-4">
                <InputField
                  label="納品予定日"
                  registration={register("min_delivery_schedule_date")}
                  type="date"
                  max="9999-12-31"
                />
                <div className="pb-2">~</div>
                <InputField
                  registration={register("max_delivery_schedule_date")}
                  type="date"
                  max="9999-12-31"
                />
              </div>
              <CheckboxField
                label="納品済み"
                registration={register("is_delivered")}
              />
              <CheckboxField
                label="請求済み"
                registration={register("is_issued")}
              />
            </div>
            <div className="flex justify-end">
              <Button type="submit" className="w-fit">
                検索
              </Button>
            </div>
          </>
        )}
      </Form>
    );
  };

  return { filterValue, FilterForm, filterTerms };
};
