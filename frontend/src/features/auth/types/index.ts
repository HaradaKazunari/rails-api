export type AuthUser = {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  bio: string;
  role: "ADMIN" | "USER";
};

export type UserResponse = {
  headers: {
    "access-token": string;
    client: string;
    uid: string;
  };
  user: AuthUser;
};
