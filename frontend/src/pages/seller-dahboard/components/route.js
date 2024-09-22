import {
  PackageSearch,
  PackagePlus,
  Library,
  Layers2,
  ChartColumnStacked,
  FileClock,
  BookUser,
  LayoutDashboard,
} from "lucide-react";

export const routes = [
  {
    path: "/dashboard/plants",
    label: "Plants",
    icon: Library,
    subRoutes: [
      { path: "/", label: "Dashboard", icon: LayoutDashboard },
      { path: "/create", label: "Create Plant", icon: PackagePlus },
      /* { path: "plants/update/id", label: "Update Plant", icon: PackageSearch },
      { path: "/delete", label: "Delete Plant", icon: PackageX }, 
      { path: "/byId", label: "Get Plant By Id", icon: ScanBarcode },
      { path: "/stock", label: "Get Stock", icon: Layers },*/
      { path: "/notinstock", label: "Get Not In Stock", icon: Layers2 },
      //{ path: "/restock", label: "Restock Plant", icon: Layers3 },
    ],
  },
  { path: "/dashboard/orders", label: "Orders", icon: PackageSearch },
  { path: "/dashboard/category", label: "Category", icon: ChartColumnStacked },
  { path: "/dashboard/history", label: "History", icon: FileClock },
  { path: "/dashboard/seller-info", label: "Seller Info", icon: BookUser },
];
