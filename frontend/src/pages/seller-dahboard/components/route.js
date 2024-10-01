import {
  PackageSearch,
  Library,
  ChartColumnStacked,
  FileClock,
  BookUser,
  LayoutDashboardIcon,
} from "lucide-react";

export const routes = [
  { path: "/seller/dashboard", label: "Dashboard", icon: LayoutDashboardIcon },
  { path: "/seller/plants", label: "Plants", icon: Library },
  { path: "/seller/orders", label: "Orders", icon: PackageSearch },
  { path: "/seller/category", label: "Category", icon: ChartColumnStacked },
  { path: "/seller/history", label: "History", icon: FileClock },
  { path: "/seller/seller-info", label: "Seller Info", icon: BookUser },
];
