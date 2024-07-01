import { AxiosResponse } from "axios";

export const getFileName = (res: AxiosResponse) => {
  const contentDisposition = res.headers["content-disposition"];
  let fileName = contentDisposition.substring(
    contentDisposition.indexOf("''") + 2,
    contentDisposition.length
  );

  fileName = decodeURI(fileName).replace(/\+/g, " ");

  return fileName;
};
