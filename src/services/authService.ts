import { decodeToken } from "@/utils/jwtDecoded";
import {
  getFormLocalStorage,
  setToLocalStorage,
  removeFormLocalStorage,
} from "@/utils/local-storage";

// Helper to set cookie (for middleware auth)
const setCookie = (name: string, value: string, days: number = 7) => {
  if (typeof document === "undefined") return;
  const expires = new Date(Date.now() + days * 864e5).toUTCString();
  document.cookie = `${name}=${encodeURIComponent(value)}; expires=${expires}; path=/`;
};

const removeCookie = (name: string) => {
  if (typeof document === "undefined") return;
  document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/`;
};

export const storeUserInfo = ({ accessToken }: { accessToken: string }) => {
  setToLocalStorage("accessToken", accessToken);
  setCookie("accessToken", accessToken); // Sync to cookie for middleware
  return;
};

export const getUserInfo = () => {
  const accessToken = getFormLocalStorage("accessToken");
  if (accessToken) {
    try {
      const decodeInfo: any = decodeToken(accessToken);
      // Check if token is expired
      if (decodeInfo.exp * 1000 < Date.now()) {
        removeUserInfo();
        return null;
      }
      return {
        ...decodeInfo,
      };
    } catch {
      return null;
    }
  }
  return null;
};

export const removeUserInfo = () => {
  removeFormLocalStorage("accessToken");
  removeCookie("accessToken");
};
