import { TSidebarItems } from "@/types/global";
import DashboardIcon from "@mui/icons-material/Dashboard";
import ArchiveIcon from "@mui/icons-material/Archive";

export const sidebarItems = (role: any): TSidebarItems[] => {
  const menus: TSidebarItems[] = [];

  if (role === "admin") {
    menus.push(
      {
        title: "Dashboard",
        path: `/dashboard/products`,
        icon: DashboardIcon,
      },
      {
        title: "Dashboard",
        path: `/dashboard/orders`,
        icon: ArchiveIcon,
      }
    );
  } else {
    menus.push({
      title: "Dashboard",
      path: `/dashboard/my-orders`,
      icon: ArchiveIcon,
    });
  }

  return [...menus];
};
