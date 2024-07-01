import { useMutation } from "@tanstack/react-query";

import { axios } from "@/lib/axios";
import { MutationConfig } from "@/lib/react-query";
import { useNotificationStore } from "@/stores/notifications";
import { PaymentTerm } from "../type";
import { saveFile } from "@/utils/downloadFile";

export type DownloadInvoiceDTO = {
  data: PaymentTerm;
  client_id: string;
  invoice_ym: string;
};

const downloadInvoice = async ({
  client_id,
  invoice_ym,
  data: { payment_term },
}: DownloadInvoiceDTO): Promise<void> => {
  return axios
    .post(
      `/invoice/issue/`,
      { client_id, invoice_ym, payment_term: payment_term },
      { responseType: "blob" }
    )
    .then((res) => saveFile(res));
};

type UseDownloadInvoiceOptions = {
  config?: MutationConfig<typeof downloadInvoice>;
};

export const useDownloadInvoice = ({
  config,
}: UseDownloadInvoiceOptions = {}) => {
  const { addNotification } = useNotificationStore();

  return useMutation({
    onError: () => {
      addNotification({
        type: "error",
        title: "ダウンロードできませんでした",
      });
    },
    ...config,
    mutationFn: downloadInvoice,
  });
};
