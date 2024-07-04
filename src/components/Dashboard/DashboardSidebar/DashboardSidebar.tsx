"use client";

import MenuIcon from "@mui/icons-material/Menu";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import Drawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import React from "react";
import Sidebar from "../Sidebar/Sidebar";
import { Avatar, Badge, Stack } from "@mui/material";
import AccountMenu from "../AccountMenu/AccountMenu";
import NotificationsIcon from "@mui/icons-material/Notifications";
import { getUserInfo } from "@/services/authService";

const drawerWidth = 240;

export default function DashboardSidebar({
  children,
}: {
  children: React.ReactNode;
}) {
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const [isClosing, setIsClosing] = React.useState(false);

  const user: any = getUserInfo();

  const handleDrawerClose = () => {
    setIsClosing(true);
    setMobileOpen(false);
  };

  const handleDrawerTransitionEnd = () => {
    setIsClosing(false);
  };

  const handleDrawerToggle = () => {
    if (!isClosing) {
      setMobileOpen(!mobileOpen);
    }
  };

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <AppBar
        position="fixed"
        sx={{
          width: { sm: `calc(100% - ${drawerWidth}px)` },
          ml: { sm: `${drawerWidth}px` },
          bgcolor: "#F4F7FE",
          boxShadow: 0,
          borderBottom: "1px solid lightgray",
        }}
      >
        <Toolbar>
          <IconButton
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: "none" } }}
          >
            <MenuIcon />
          </IconButton>
          {/* <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
            }}
          >
            <Box>
              <Typography component={"p"}>Welcome to,</Typography>
              <Typography fontSize={20} component={"h1"} fontWeight={600}>
                Fabric finesse
              </Typography>
            </Box>
            <Box>
              <Typography component={"p"}>Welcome to,</Typography>
              <Typography fontSize={20} component={"h1"} fontWeight={600}>
                Fabric finesse
              </Typography>
            </Box>
          </Box> */}
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              width: "100%",
            }}
          >
            <Box>
              <Typography component={"p"}>Welcome to,</Typography>
              <Typography fontSize={20} component={"h1"} fontWeight={600}>
                Fabric finesse
              </Typography>
            </Box>
            <Stack direction={"row"} gap={3}>
              <Badge badgeContent={1} color="primary">
                <IconButton sx={{ background: "#fffff" }}>
                  <NotificationsIcon color="action" />
                </IconButton>
              </Badge>
              <Avatar
                alt={user ? user?.email : "name"}
                src={
                  "https://images.unsplash.com/photo-1633332755192-727a05c4013d?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NDh8fHVzZXJ8ZW58MHx8MHx8fDA%3D"
                }
              />
              <AccountMenu />
            </Stack>
          </Box>
        </Toolbar>
      </AppBar>
      <Box
        component="nav"
        sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
        aria-label="mailbox folders"
      >
        {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
        <Drawer
          variant="temporary"
          open={mobileOpen}
          onTransitionEnd={handleDrawerTransitionEnd}
          onClose={handleDrawerClose}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
          sx={{
            display: { xs: "block", sm: "none" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
            },
          }}
        >
          <Sidebar />
        </Drawer>
        <Drawer
          variant="permanent"
          sx={{
            display: { xs: "none", sm: "block" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
            },
          }}
          open
        >
          <Sidebar />
        </Drawer>
      </Box>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          width: { sm: `calc(100% - ${drawerWidth}px)` },
        }}
      >
        <Toolbar />
        {children}
      </Box>
    </Box>
  );
}
