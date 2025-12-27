import { getUserInfo } from "@/services/authService";
import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
import NavbarLink from "./NavbarLink";


const NavItems = () => {
  const AuthButton = dynamic(
    () => import("@/components/ui/AuthButton/AuthButton"),
    { ssr: false }
  );
  const [userInfo, setUserInfo] = useState<any>(null);


  useEffect(() => {
    const userInfoData = getUserInfo();
    setUserInfo(userInfoData);
  }, []);

  const userRole = userInfo?.role;

  return (
    <>
      <NavbarLink title="Home" path="/" />
      <NavbarLink title="Flash Sale" path="/flash-sale" />
      <NavbarLink title="Products" path="/products" />

      {userRole === "admin" ? (
        <NavbarLink title="Dashboard" path="/dashboard" />
      ) : (
        <NavbarLink title="Profile" path="/profile" />
      )}
      <AuthButton />
    </>
  );
};

export default NavItems;
