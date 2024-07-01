import { axios } from "@/lib/axios";

import { UserResponse } from "../types";

export const logout = (): Promise<UserResponse> => {
  return axios.delete("/auth/sign_out/");
};
