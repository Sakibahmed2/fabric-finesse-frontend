"use client";

import DashboardIcon from "@mui/icons-material/Dashboard";
import { Box, Typography } from "@mui/material";
import Link from "next/link";

const DashboardSidebar = () => {
  return (
    <aside className="bg-gray-200 p-4 lg:p-5 col-span-2 h-screen sticky top-0 left-0 overflow-auto">
      <Typography
        variant="h4"
        component={Link}
        href={"/"}
        fontWeight={600}
        visibility={{
          xs: "hidden",
          md: "visible",
        }}
      >
        Fabric{" "}
        <Box component="span" color="primary.main">
          finesse
        </Box>
      </Typography>
      <nav className="flex flex-col gap-2 md:mt-8">
        <Link
          href="/dashboard/all-products"
          className={`bg-gray md:p-3 rounded-md transition-all  flex items-center gap-2 md:border border-black`}
        >
          <DashboardIcon className="shrink-0" />
          <span className="truncate">Dashboard</span>
        </Link>
      </nav>
    </aside>
  );
};

export default DashboardSidebar;
