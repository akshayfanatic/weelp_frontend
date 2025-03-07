import {
    ArrowUpDown,
    Bot,
    ChartColumnIncreasing,
    Compass,
    Files,
    FolderTree,
    Home,
    MailsIcon,
    Map,
    Settings,
    Tag,
    Tags,
    UserCog2,
    Users,
    Wallet,
  } from "lucide-react";

export const DashboardAdminNav = {
  user: {
    name: "shadcn",
    email: "m@example.com",
    avatar: "/assets/images/user.png",
  },
  adminRoutes: [
    { title: "Dashboard", icon: Home, url: "/dashboard/admin/" },  
    { title: "Activities", icon: Bot, url: "/dashboard/admin/activities" },
    {
      title: "Taxonomies",
      icon: Tags,
      url: "/dashboard/admin/taxonomies",
      children: [
        {
          title: "Categories",
          icon: Tag,
          url: "/dashboard/admin/taxonomies/categories",
        },
        { title: "Tags", icon: Tag, url: "/dashboard/admin/taxonomies/tags" },
        {
          title: "Attributes",
          icon: Tag,
          url: "/dashboard/admin/taxonomies/attributes",
        },
      ],
    },
    { title: "Itineraries", icon: Map, url: "/dashboard/admin/itineraries" },
    {
      title: "Transfers",
      icon: ArrowUpDown,
      url: "/dashboard/admin/transfers",
    },
    {
      title: "Package Builder",
      icon: Compass,
      url: "/dashboard/admin/package-builder",
    },
    { title: "Orders", icon: Wallet, url: "/dashboard/admin/orders" },
    { title: "Media", icon: Files, url: "/dashboard/admin/media" },
    { title: "Emails", icon: MailsIcon, url: "/dashboard/admin/emails" },
    {
      title: "Reports",
      icon: ChartColumnIncreasing,
      url: "/dashboard/admin/reports",
    },
    { title: "Users", icon: Users, url: "/dashboard/admin/users" },
    { title: "Roles", icon: UserCog2, url: "/dashboard/admin/roles" },
    { title: "Settings", icon: Settings, url: "/dashboard/admin/settings" },
  ],
};
