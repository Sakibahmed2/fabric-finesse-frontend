"use client";

import { getUserInfo, removeUserInfo } from "@/services/authService";
import { Box, Button, Tooltip, Menu, MenuItem, Avatar, ListItemIcon, ListItemText } from "@mui/material";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

import LoginIcon from '@mui/icons-material/Login';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import LogoutIcon from '@mui/icons-material/Logout';
import PersonIcon from '@mui/icons-material/Person';

const AuthButton = () => {
  const user: any = getUserInfo();
  const router = useRouter();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleProfile = () => {
    router.push(user?.role === "admin" ? "/dashboard" : "/profile");
    handleClose();
  };

  const handleLogout = () => {
    removeUserInfo(); // Removes from both localStorage and cookie
    handleClose();
    router.refresh();
  };

  return (
    <>
      {user?.userId ? (
        <>
          <Tooltip title="Account">
            <Avatar
              onClick={handleClick}
              sx={{
                bgcolor: "primary.main",
                width: 36,
                height: 36,
                cursor: "pointer",
                "&:hover": {
                  bgcolor: "primary.dark",
                },
              }}
            >
              {user.email?.[0]?.toUpperCase() || "U"}
            </Avatar>
          </Tooltip>

          <Menu
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose}
            onClick={handleClose}
            transformOrigin={{ horizontal: 'right', vertical: 'top' }}
            anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
            PaperProps={{
              elevation: 3,
              sx: {
                mt: 1,
                minWidth: 180,
                borderRadius: 2,
              },
            }}
          >
            <MenuItem onClick={handleProfile}>
              <ListItemIcon>
                <PersonIcon fontSize="small" />
              </ListItemIcon>
              <ListItemText>
                {user?.role === "admin" ? <Link href="/dashboard">
                  Dashboard</Link> : <Link href="/profile">Profile</Link>}
              </ListItemText>
            </MenuItem>

            <MenuItem onClick={handleLogout}>
              <ListItemIcon>
                <LogoutIcon fontSize="small" color="error" />
              </ListItemIcon>
              <ListItemText sx={{ color: "error.main" }}>
                Logout
              </ListItemText>
            </MenuItem>
          </Menu>
        </>
      ) : (
        <Box component={Link} href="/login">
          <Tooltip title="Login/Signup">
            <LoginIcon sx={{ verticalAlign: 'middle', marginRight: '8px', color: 'black', cursor: 'pointer' }} />
          </Tooltip>
        </Box>
      )}
    </>
  );
};

export default AuthButton;
