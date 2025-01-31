import { NavProjects } from "@/components/nav-projects";
import { NavUser } from "@/components/nav-user";
import { TeamSwitcher } from "@/components/team-switcher";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Separator } from "@/components/ui/separator";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenuButton,
  SidebarProvider,
  SidebarRail,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import {
  ArrowRight,
  CheckCircle,
  Command,
  CreditCard,
  Edit,
  Eye,
  GalleryVerticalEnd,
  Heart,
  Home,
  User,
  Users,
} from "lucide-react";
import { useContext } from "react";
import { NavLink, Outlet } from "react-router-dom";
import { AuthContext } from "../context/AuthProvider";
import useAdmin from "../hooks/useAdmin";

const Dashboard = () => {
  const { user } = useContext(AuthContext);
  const [isAdmin] = useAdmin();

  // Sample data for teams, navigation, and user
  const data = {
    user: {
      name: user?.displayName || "Guest",
      email: user?.email || "N/A",
      avatar: user?.photoURL || "/avatars/default.jpg",
    },

    teams: isAdmin
      ? [{ name: "Admin", logo: GalleryVerticalEnd, plan: "Enterprise" }]
      : [{ name: "General User", logo: Command, plan: "Free" }],

    projects: isAdmin
      ? [
          {
            name: "Admin Dashboard",
            url: "/dashboard/adminHome",
            icon: GalleryVerticalEnd,
          },
          {
            name: "Manage Users",
            url: "/dashboard/manageUsers",
            icon: Users,
          },
          {
            name: "Approved Premium",
            url: "/dashboard/approvedPremium",
            icon: CheckCircle,
          },
          {
            name: "Approved Contact Requests",
            url: "/dashboard/approvedContactRequests",
            icon: CheckCircle,
          },
        ]
      : [
          { name: "User Home", url: "/dashboard/userHome", icon: User },
          {
            name: "Edit Biodata",
            url: "/dashboard/editBiodata",
            icon: Edit,
          },
          {
            name: "View Biodata",
            url: "/dashboard/viewBiodata",
            icon: Eye,
          },
          {
            name: "My Contact Requests",
            url: "/dashboard/myContactRequests",
            icon: Users,
          },
          {
            name: "Favourite Biodata",
            url: "/dashboard/favouritesBiodata",
            icon: Heart,
          },
          {
            name: "GotMarried",
            url: "/dashboard/GotMarried",
            icon: CheckCircle,
          },
          {
            name: "Payment History",
            url: "/dashboard/paymentHistory",
            icon: CreditCard,
          },
        ],
  };

  return (
    <SidebarProvider>
      <div className="flex min-h-screen">
        {/* Sidebar */}
        <Sidebar
          collapsible="icon"
          className="bg-primary text-primary-foreground"
        >
          <SidebarHeader>
            <TeamSwitcher teams={data.teams} />
          </SidebarHeader>
          <SidebarContent>
            <NavProjects projects={data.projects} />
          </SidebarContent>
          <SidebarFooter>
            <NavLink
              to="/"
              className="flex items-center gap-2  text-sm hover:bg-sidebar-hover rounded-md"
            >
              <SidebarMenuButton>
                <Home className="size-4" />
                <span>Home</span>
              </SidebarMenuButton>
            </NavLink>
            <NavLink
              to="/biodatas"
              className="flex items-center gap-2  text-sm hover:bg-sidebar-hover rounded-md"
            >
              <SidebarMenuButton>
                <ArrowRight className="size-4" />
                <span>Redirect to Biodatas</span>
              </SidebarMenuButton>
            </NavLink>
            <NavUser user={data.user} />
          </SidebarFooter>
          <SidebarRail />
        </Sidebar>

        <div className="flex-1 flex flex-col">
          <header className="flex h-16 items-center gap-2 px-4 bg-white ">
            <SidebarTrigger className="-ml-1" />
            <Separator orientation="vertical" className="h-4 mx-2" />
            <Breadcrumb>
              <BreadcrumbList>
                <BreadcrumbItem>
                  <BreadcrumbLink to="/dashboard">Dashboard</BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator />
                <BreadcrumbItem>
                  <BreadcrumbPage>
                    {isAdmin ? "Admin Dashboard" : "User Dashboard"}
                  </BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
          </header>
          <div className="p-6 flex-1 bg-background">
            <Outlet />
          </div>
        </div>
      </div>
    </SidebarProvider>
  );
};

export default Dashboard;
