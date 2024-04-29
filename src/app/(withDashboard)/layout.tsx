"use client";

import DashboardSidebar from "@/components/Dashboard/DashboardSidebar/DashboardSidebar";
import { getUserInfo } from "@/services/authService";
import { useRouter } from "next/navigation";
import { ReactNode, useEffect } from "react";

const DashboardLayout = ({ children }: { children: ReactNode }) => {
  const router = useRouter();

  const user = getUserInfo();
  if (!user) {
    return router.push("/login");
  }

  return (
    <>
      <DashboardSidebar>{children}</DashboardSidebar>
    </>
  );
};

export default DashboardLayout;
