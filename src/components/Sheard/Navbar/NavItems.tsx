import { useAppSelector } from "@/redux/hooks";
import { getUserInfo } from "@/services/authService";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { Box, IconButton } from "@mui/material";
import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
import NavbarLink from "./NavbarLink";

import Badge from "@mui/material/Badge";
import Link from "next/link";

const NavItems = () => {
  const AuthButton = dynamic(
    () => import("@/components/ui/AuthButton/AuthButton"),
    { ssr: false }
  );
  const [userInfo, setUserInfo] = useState<any>(null);

  const cartData = useAppSelector((state) => state.cart.carts);

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
        <NavbarLink title="Dashboard" path="/dashboard/products" />
      ) : (
        <NavbarLink title="Dashboard" path="/dashboard/my-orders" />
      )}

      <Box component={Link} href={"/checkout"}>
        <IconButton
          aria-label="cart"
          sx={{
            border: "2px solid lightgray",
            borderRadius: 1,
            padding: "2px 5px",
          }}
        >
          <Badge badgeContent={cartData.length} color="secondary">
            <ShoppingCartIcon color="warning" />
          </Badge>
        </IconButton>
      </Box>

      <AuthButton />
    </>
  );
};

export default NavItems;
