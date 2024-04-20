"use client";

import { getUserInfo } from "@/services/authService";
import { removeFormLocalStorage } from "@/utils/local-storage";
import { Button } from "@mui/material";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React from "react";

const AuthButton = () => {
  const user: any = getUserInfo();
  const router = useRouter();

  const handleLogout = () => {
    removeFormLocalStorage("accessToken");
    router.refresh();
  };

  return (
    <>
      {user?.userId ? (
        <Button onClick={() => handleLogout()} color="warning">
          Logout
        </Button>
      ) : (
        <Button component={Link} href="/login">
          Login
        </Button>
      )}
    </>
  );
};

export default AuthButton;
