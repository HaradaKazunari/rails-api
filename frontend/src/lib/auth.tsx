// @ts-ignore
import { configureAuth } from "react-query-auth";
import {
  loginWithUserNameAndPassword,
  registerWithUserNameAndPassword,
  getUser,
  UserResponse,
  LoginCredentialsDTO,
  RegisterCredentialsDTO,
} from "@/features/auth";
import storage from "@/utils/storage";
import { ROLES } from "./authorization";
import { logout } from "@/features/auth/api/logout";
import { deleteCookie } from "@/utils/cookie";
import { redirectHome } from "@/utils/redirect";

async function handleUserResponse(data: UserResponse) {
  const client = data.headers["client"];
  const uid = data.headers["uid"];
  const accessToken = data.headers["access-token"];

  const authToken = {
    client,
    uid,
    accessToken,
  };

  storage.setToken(authToken);
  return { uid };
}

async function userFn() {
  const { is_login, data } = await getUser();
  if (!is_login) return null;

  return {
    data,
    is_login,
    role: ROLES.ADMIN,
  };
}

async function loginFn(data: LoginCredentialsDTO) {
  const response = await loginWithUserNameAndPassword(data);
  const user = await handleUserResponse(response);
  return user;
}

async function registerFn(data: RegisterCredentialsDTO) {
  const response = await registerWithUserNameAndPassword(data);
  const user = await handleUserResponse(response);
  return user;
}

async function logoutFn() {
  await logout();
  deleteCookie("csrftoken");
  storage.clearToken();
  redirectHome();
}

const authConfig = {
  userFn,
  loginFn,
  registerFn,
  logoutFn,
};

export const { useUser, useLogin, useRegister, useLogout, AuthLoader } =
  configureAuth(authConfig);
