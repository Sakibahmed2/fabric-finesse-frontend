import NavbarLink from "./NavbarLink";

const NavItems = () => {
  return (
    <>
      <NavbarLink title="Home" path="/" />
      <NavbarLink title="Flash Sale" path="/flash-sale" />
      <NavbarLink title="Products" path="/products" />
      <NavbarLink title="Dashboard" path="/dashboard/all-products" />
    </>
  );
};

export default NavItems;
