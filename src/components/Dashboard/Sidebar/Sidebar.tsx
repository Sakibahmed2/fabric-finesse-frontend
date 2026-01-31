import { useState, useEffect } from "react";
import { getUserInfo } from "@/services/authService";
import { Box, Divider, List, Stack, Typography } from "@mui/material";
import Link from "next/link";
import dynamic from "next/dynamic";

// icons
import DashboardIcon from "@mui/icons-material/Dashboard";
import ListIcon from "@mui/icons-material/List";
import InventoryIcon from "@mui/icons-material/Inventory";
import CategoryIcon from '@mui/icons-material/Category';
import LocalActivityIcon from '@mui/icons-material/LocalActivity';

const Sidebar = () => {
  const [userInfo, setUserInfo] = useState<any>(null);

  useEffect(() => {
    const userInfoData = getUserInfo();
    setUserInfo(userInfoData);
  }, []);

  const userRole = userInfo?.role;

  const ItemsLink = dynamic(() => import("./ItemsLink"), { ssr: false });

  return (
    <Box>
      <Stack
        direction={"row"}
        alignItems={"center"}
        justifyContent={"center"}
        gap={1}
        py={2}
        mt={1}
        component={Link}
        href="/"
      >
        <Typography variant="h5" component={"h1"}>
          <Box component="span" color="primary.main">
            {" "}
            Fabric{" "}
          </Box>{" "}
          Finesse
        </Typography>
      </Stack>
      <Divider />
      <List>
        {userRole === "admin" && (
          <>
            <ItemsLink
              path="/dashboard"
              title="Dashboard"
              icon={DashboardIcon}
            />
            <ItemsLink
              path="/dashboard/products"
              title="All products"
              icon={ListIcon}
            />
            <ItemsLink
              path="/dashboard/categories"
              title="Categories"
              icon={CategoryIcon}
            />
            <ItemsLink
              path="/dashboard/orders"
              title="Orders"
              icon={InventoryIcon}
            />
            <ItemsLink
              path="/dashboard/coupons"
              title="Coupons"
              icon={LocalActivityIcon}
            />
          </>
        )}
      </List>
    </Box>
  );
};

export default Sidebar;
