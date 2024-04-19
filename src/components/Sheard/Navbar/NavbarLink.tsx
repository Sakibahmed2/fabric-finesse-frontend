import { Typography } from "@mui/material";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

type TNavbarLinkProps = {
  title: string;
  path: string;
};

const NavbarLink = ({ title, path }: TNavbarLinkProps) => {
  const pathname = usePathname();

  return (
    <Typography
      component={Link}
      href={`${path}`}
      sx={{
        borderBottom: "2px solid white",
        borderRadius: "3px",
        px: "10px",
        "&:hover": {
          px: "10px",
          borderBottom: "2px solid gray",
          borderRadius: "3px",
          cursor: "pointer",
          transition: "all 0.5s",
        },
        ...(pathname === path
          ? {
              color: "primary.main",
            }
          : {}),
      }}
    >
      {title}
    </Typography>
  );
};

export default NavbarLink;
