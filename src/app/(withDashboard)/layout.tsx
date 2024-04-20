import DashboardSidebar from "@/components/Dashboard/DashboardSidebar/DashboardSidebar";
import { Metadata } from "next";
import { ReactNode } from "react";

export const metadata: Metadata = {
  title: "Fabric finesse | Dashboard",
  description: "Welcome to Fabric Finesse cloth brand",
};

const DashboardLayout = ({ children }: { children: ReactNode }) => {
  return (
    <>
      <DashboardSidebar>{children}</DashboardSidebar>
    </>
  );
};

export default DashboardLayout;
