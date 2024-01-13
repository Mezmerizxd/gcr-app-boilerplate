const storagePrefix = 'gcr_app_boilerplate_';

const storage = {
  getToken: () => {
    return JSON.parse(window.localStorage.getItem(`${storagePrefix}token`));
  },
  setToken: (token: string) => {
    window.localStorage.setItem(`${storagePrefix}token`, JSON.stringify(token));
    document.cookie = `token=${token}; path=/`;
  },
  clearToken: () => {
    window.localStorage.removeItem(`${storagePrefix}token`);
    document.cookie = `token=; path=/; expires=Thu, 01 Jan 1970 00:00:01 GMT`;
  },
};

export default storage;
