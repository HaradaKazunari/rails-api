import { AxiosResponse } from "axios";
import { saveAs } from "file-saver";

export const saveFile = (res: AxiosResponse) => {
  const blob = new Blob([res.data], { type: res.data.type });
  const fileName = getFileName(res);
  saveAs(blob, fileName);
};

export const getFileName = (res: AxiosResponse) => {
  const contentDisposition = res.headers["content-disposition"];
  let fileName = contentDisposition.substring(
    contentDisposition.indexOf("''") + 2,
    contentDisposition.length
  );

  fileName = decodeURI(fileName).replace(/\+/g, " ");

  return fileName;
};
