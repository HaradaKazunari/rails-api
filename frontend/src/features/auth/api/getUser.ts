import { axios } from "@/lib/axios";

import { AuthUser } from "../types";
import { AxiosResponse } from "axios";

export const getUser = async (): Promise<AuthUser | AxiosResponse | null> => {
  return axios
    .get("/auth/sessions/")
    .then((res) => res)
    .catch(() => null)
    .then((result) => result);
};
