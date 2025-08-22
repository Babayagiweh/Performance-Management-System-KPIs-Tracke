import { NavLink, useLocation } from "react-router-dom";
import { 
  BarChart3, 
  Target, 
  Users, 
  Trophy, 
  Settings, 
  Home,
  FileText,
  TrendingUp
} from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarHeader,
  useSidebar,
} from "@/components/ui/sidebar";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

interface SidebarItem {
  title: string;
  url: string;
  icon: any;
  roles: string[];
}

const items: SidebarItem[] = [
  { title: "Dashboard", url: "/", icon: Home, roles: ["all"] },
  { title: "My Goals", url: "/goals", icon: Target, roles: ["staff", "hod"] },
  { title: "My KPIs", url: "/kpis", icon: TrendingUp, roles: ["staff", "hod"] },
  { title: "Team Performance", url: "/team", icon: Users, roles: ["hod", "dean", "hr"] },
  { title: "Performance Reviews", url: "/reviews", icon: FileText, roles: ["hod", "dean", "hr"] },
  { title: "Analytics", url: "/analytics", icon: BarChart3, roles: ["dean", "hr"] },
  { title: "Employee Management", url: "/employees", icon: Users, roles: ["hr"] },
  { title: "Reports", url: "/reports", icon: Trophy, roles: ["hr", "dean"] },
  { title: "Settings", url: "/settings", icon: Settings, roles: ["all"] },
];

interface AppSidebarProps {
  userRole: string;
  userName: string;
}

export function AppSidebar({ userRole, userName }: AppSidebarProps) {
  const { state } = useSidebar();
  const location = useLocation();
  const currentPath = location.pathname;

  const isActive = (path: string) => currentPath === path;
  const getNavCls = ({ isActive }: { isActive: boolean }) =>
    isActive ? "bg-primary text-primary-foreground" : "hover:bg-accent";

  const filteredItems = items.filter(item => 
    item.roles.includes("all") || item.roles.includes(userRole)
  );

  const getRoleDisplayName = (role: string) => {
    const roleNames = {
      hr: "HR Manager",
      dean: "Dean",
      hod: "Head of Department", 
      staff: "Staff Member"
    };
    return roleNames[role as keyof typeof roleNames] || role;
  };

  const collapsed = state === "collapsed";

  return (
    <Sidebar className={collapsed ? "w-14" : "w-64"} collapsible="icon">
      <SidebarHeader className="p-4">
        {!collapsed && (
          <div className="flex items-center gap-3">
            <Avatar>
              <AvatarFallback className="bg-gradient-primary text-primary-foreground">
                {userName.slice(0, 2).toUpperCase()}
              </AvatarFallback>
            </Avatar>
            <div className="flex flex-col">
              <span className="text-sm font-medium">{userName}</span>
              <span className="text-xs text-muted-foreground">
                {getRoleDisplayName(userRole)}
              </span>
            </div>
          </div>
        )}
      </SidebarHeader>

      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Navigation</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {filteredItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <NavLink to={item.url} end className={getNavCls}>
                      <item.icon className="h-4 w-4" />
                      {!collapsed && <span>{item.title}</span>}
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}