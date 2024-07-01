const storagePrefix = "bulletproof_react_";

const storage = {
  getToken: (key?: string) => {
    const cookies = window.localStorage.getItem(
      `${storagePrefix}token`
    ) as string;

    const tokenObj = JSON.parse(cookies);
    if (!key) return tokenObj;
    return tokenObj[key];
  },
  setToken: (token: any) => {
    window.localStorage.setItem(`${storagePrefix}token`, JSON.stringify(token));
  },
  clearToken: () => {
    window.localStorage.removeItem(`${storagePrefix}token`);
  },
};

export default storage;
