"use client";

import DashboardSidebar from "@/components/Dashboard/DashboardSidebar/DashboardSidebar";
import { getUserInfo } from "@/services/authService";
import { useRouter } from "next/navigation";
import { ReactNode, useEffect } from "react";

const DashboardLayout = ({ children }: { children: ReactNode }) => {
  const router = useRouter();

  useEffect(() => {
    const redirectUser = async () => {
      const user = getUserInfo();
      if (!user) {
        await router.push("/login");
      }
    };

    redirectUser();
  }, []);

  return (
    <>
      <DashboardSidebar>{children}</DashboardSidebar>
    </>
  );
};

export default DashboardLayout;
