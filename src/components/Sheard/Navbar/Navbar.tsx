"use client";

import MenuIcon from "@mui/icons-material/Menu";
import { Container, Stack } from "@mui/material";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import Divider from "@mui/material/Divider";
import Drawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import List from "@mui/material/List";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Link from "next/link";
import * as React from "react";
import NavItems from "./NavItems";

const drawerWidth = 240;

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = React.useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen((prevState) => !prevState);
  };

  const drawer = (
    <Box onClick={handleDrawerToggle} sx={{ textAlign: "center" }}>
      <Typography variant="h6" sx={{ my: 2 }}>
        <Typography variant="h4" component={Link} href={"/"} fontWeight={600}>
          Fabric{" "}
          <Box component="span" color="primary.main">
            finesse
          </Box>
        </Typography>
      </Typography>
      <Divider />
      <List>
        <Stack gap={2}>
          {/* Nav links  */}
          <NavItems />
        </Stack>
      </List>
    </Box>
  );

  return (
    <Container>
      <Box sx={{ display: "flex" }}>
        <CssBaseline />
        <AppBar
          component="nav"
          sx={{
            bgcolor: "white",
          }}
        >
          <Container>
            <Toolbar>
              <IconButton
                aria-label="open drawer"
                edge="start"
                onClick={handleDrawerToggle}
                sx={{ mr: 2, display: { sm: "none" } }}
              >
                <MenuIcon />
                <Typography
                  variant="h5"
                  component={Link}
                  href={"/"}
                  fontWeight={600}
                  sx={{
                    ml: 10,
                  }}
                >
                  Fabric{" "}
                  <Box component="span" color="primary.main">
                    finesse
                  </Box>
                </Typography>
              </IconButton>
              <Typography
                sx={{ flexGrow: 1, display: { xs: "none", sm: "block" } }}
                variant="h4"
                component={Link}
                href={"/"}
                fontWeight={600}
                color={"black"}
              >
                Fabric{" "}
                <Box component="span" color="primary.main">
                  finesse
                </Box>
              </Typography>
              <Box sx={{ display: { xs: "none", sm: "block" } }}>
                <Stack
                  direction={"row"}
                  gap={2}
                  justifyContent={"center"}
                  alignItems={"center"}
                >
                  {/* Nav links  */}
                  <NavItems />
                </Stack>
              </Box>
            </Toolbar>
          </Container>
        </AppBar>

        <nav>
          <Drawer
            variant="temporary"
            open={mobileOpen}
            onClose={handleDrawerToggle}
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
            {drawer}
          </Drawer>
        </nav>
      </Box>
    </Container>
  );
}
