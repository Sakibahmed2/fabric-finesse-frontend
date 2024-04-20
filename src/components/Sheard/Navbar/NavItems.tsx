import { Button } from "@mui/material";
import NavbarLink from "./NavbarLink";
import Link from "next/link";

const NavItems = () => {
  return (
    <>
      <NavbarLink title="Home" path="/" />
      <NavbarLink title="Flash Sale" path="/flash-sale" />
      <NavbarLink title="Products" path="/products" />
      <NavbarLink title="Dashboard" path="/dashboard/all-products" />
      <Button component={Link} href="/login">
        Login
      </Button>
    </>
  );
};

export default NavItems;
