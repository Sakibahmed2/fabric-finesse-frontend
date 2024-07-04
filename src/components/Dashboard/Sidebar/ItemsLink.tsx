"use client";

import {
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  SvgIconTypeMap,
} from "@mui/material";
import { OverridableComponent } from "@mui/material/OverridableComponent";
import Link from "next/link";
import { usePathname } from "next/navigation";

type TItemsLinkProps = {
  title: string;
  path: string;
  icon?: OverridableComponent<SvgIconTypeMap<{}, "svg">> & { muiName: string };
};

const ItemsLink = ({ title, path, icon: IconComponent }: TItemsLinkProps) => {
  const pathname = usePathname();

  return (
    <Link href={path}>
      <ListItem
        disablePadding
        sx={{
          ...(pathname === path
            ? {
                borderRight: "5px solid #1B9C85",
                bgcolor: "#F4F7FE",
                "& button": {
                  color: "#1B9C85",
                },
              }
            : {}),
          mb: 1,
          p: 0,
        }}
      >
        <ListItemButton>
          <ListItemIcon>{IconComponent && <IconComponent />}</ListItemIcon>
          <ListItemText primary={title} />
        </ListItemButton>
      </ListItem>
    </Link>
  );
};

export default ItemsLink;
