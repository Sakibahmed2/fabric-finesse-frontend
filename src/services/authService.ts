import { decodeToken } from "@/utils/jwtDecoded";
import { getFormLocalStorage, setToLocalStorage } from "@/utils/local-storage";

export const storeUserInfo = ({ accessToken }: { accessToken: string }) => {
  return setToLocalStorage("accessToken", accessToken);
};

export const getUserInfo = () => {
  const accessToken = getFormLocalStorage("accessToken");
  if (accessToken) {
    const decodeInfo = decodeToken(accessToken);
    return {
      ...decodeInfo,
    };
  }
};
