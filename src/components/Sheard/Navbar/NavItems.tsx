import dynamic from "next/dynamic";
import NavbarLink from "./NavbarLink";

const NavItems = () => {
  const AuthButton = dynamic(
    () => import("@/components/ui/AuthButton/AuthButton"),
    { ssr: false }
  );

  return (
    <>
      <NavbarLink title="Home" path="/" />
      <NavbarLink title="Flash Sale" path="/flash-sale" />
      <NavbarLink title="Products" path="/products" />
      <NavbarLink title="Dashboard" path="/dashboard/all-products" />
      <AuthButton />
    </>
  );
};

export default NavItems;
