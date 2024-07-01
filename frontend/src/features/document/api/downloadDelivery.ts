import { useMutation } from "@tanstack/react-query";

import { axios } from "@/lib/axios";
import { MutationConfig } from "@/lib/react-query";
import { useNotificationStore } from "@/stores/notifications";
import { saveFile } from "@/utils/downloadFile";

export type DownloadDeliveryDTO = {
  data: {
    delivery_date: string;
  };
  project_id: string;
};

export const downloadDelivery = async ({
  data,
  project_id,
}: DownloadDeliveryDTO): Promise<void> => {
  return axios
    .post(
      `/delivery/issue/`,
      { project: project_id, ...data },
      { responseType: "blob" }
    )
    .then((res) => saveFile(res));
};

type UseDownloadDeliveryOptions = {
  config?: MutationConfig<typeof downloadDelivery>;
};

export const useDownloadDelivery = ({
  config,
}: UseDownloadDeliveryOptions = {}) => {
  const { addNotification } = useNotificationStore();

  return useMutation({
    onError: () => {
      addNotification({
        type: "error",
        title: "ダウンロードできませんでした",
      });
    },
    ...config,
    mutationFn: downloadDelivery,
  });
};
