import { useMutation } from "@tanstack/react-query";

import { axios } from "@/lib/axios";
import { MutationConfig } from "@/lib/react-query";
import { saveFile } from "@/utils/downloadFile";

export type DownloadEstimateDTO = {
  project_id: string;
};

export const downloadEstimate = async ({
  project_id,
}: DownloadEstimateDTO): Promise<void> => {
  return axios
    .post(`/estimate/issue/`, { project: project_id }, { responseType: "blob" })
    .then((res) => saveFile(res));
};

type UseDownloadEstimateOptions = {
  config?: MutationConfig<typeof downloadEstimate>;
};

export const useDownloadEstimate = ({
  config,
}: UseDownloadEstimateOptions = {}) => {
  return useMutation({
    ...config,
    mutationFn: downloadEstimate,
  });
};
