export const setToLocalStorage = (key: string, accessToken: string) => {
  if (!key || typeof window === "undefined") {
    return;
  }
  localStorage.setItem(key, accessToken);
};

export const getFormLocalStorage = (key: string) => {
  if (!key || typeof window === "undefined") {
    return "";
  }

  return localStorage.getItem(key);
};

export const removeFormLocalStorage = (key: string) => {
  if (!key || typeof window === "undefined") {
    return "";
  }

  return localStorage.removeItem(key);
};
