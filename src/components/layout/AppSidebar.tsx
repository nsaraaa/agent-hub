import { NavLink, useLocation } from "react-router-dom";
import {
  ChevronDown,
  Bot,
  MessageCircle,
  BarChart3,
  Store,
  Users,
  Settings,
  Plus,
  TestTube,
  TrendingUp,
  GitBranch,
  User,
  Building2,
  Code,
  ShoppingCart,
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
  useSidebar,
} from "@/components/ui/sidebar";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";

const navigationItems = [
  {
    title: "Create Agent",
    items: [
      { title: "Create", url: "/create", icon: Plus },
      { title: "Playground", url: "/playground", icon: TestTube },
      { title: "Chat Analysis", url: "/analysis", icon: BarChart3 },
    ],
  },
  {
    title: "Agent Store",
    items: [
      { title: "My Agents", url: "/my-agents", icon: Bot },
      { title: "Trending Agents", url: "/trending", icon: TrendingUp },
      { title: "Marketplace", url: "/marketplace", icon: ShoppingCart },
    ],
  },
  {
    title: "Management",
    items: [
      { title: "All Agents", url: "/all-agents", icon: Users },
      { title: "Prompt Management", url: "/prompt-management", icon: GitBranch },
    ],
  },
  {
    title: "Developer",
    items: [
      { title: "Developer Hub", url: "/developer-hub", icon: Code },
    ],
  },
];

export function AppSidebar() {
  const sidebarContext = useSidebar();
  const location = useLocation();
  const collapsed = false; // Simplified for now

  const isActive = (path: string) => location.pathname === path;
  const isGroupActive = (items: { url: string }[]) =>
    items.some((item) => isActive(item.url));

  return (
    <Sidebar className="border-r border-border bg-sidebar">
      <SidebarContent className="p-4 flex flex-col h-full">
        <div className="flex-1">
          <div className="mb-6">
            <NavLink to="/" className="block">
              <div className="flex items-center space-x-3 hover:bg-sidebar-accent rounded-lg p-2 transition-colors cursor-pointer">
                <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                  <Bot className="w-5 h-5 text-primary-foreground" />
                </div>
                {!collapsed && (
                  <div>
                    <h2 className="font-semibold text-sidebar-foreground">Agent Hub</h2>
                    <p className="text-xs text-sidebar-foreground/60">Enterprise Platform</p>
                  </div>
                )}
              </div>
            </NavLink>
          </div>

          {navigationItems.map((group, index) => (
            <SidebarGroup key={index} className="mb-4">
              <Collapsible defaultOpen={isGroupActive(group.items)}>
                <CollapsibleTrigger asChild>
                  <SidebarGroupLabel className="flex items-center justify-between hover:bg-sidebar-accent rounded-md p-2 cursor-pointer">
                    <span className="text-sm font-medium text-sidebar-foreground">
                      {!collapsed && group.title}
                    </span>
                    {!collapsed && <ChevronDown className="w-4 h-4" />}
                  </SidebarGroupLabel>
                </CollapsibleTrigger>
                <CollapsibleContent>
                  <SidebarGroupContent>
                    <SidebarMenu>
                      {group.items.map((item) => (
                        <SidebarMenuItem key={item.title}>
                          <SidebarMenuButton asChild>
                            <NavLink
                              to={item.url}
                              className={({ isActive }) =>
                                `flex items-center space-x-3 px-3 py-2 rounded-md transition-colors ${
                                  isActive
                                    ? "bg-primary text-primary-foreground"
                                    : "text-sidebar-foreground hover:bg-sidebar-accent"
                                }`
                              }
                            >
                              <item.icon className="w-4 h-4" />
                              {!collapsed && <span className="text-sm">{item.title}</span>}
                            </NavLink>
                          </SidebarMenuButton>
                        </SidebarMenuItem>
                      ))}
                    </SidebarMenu>
                  </SidebarGroupContent>
                </CollapsibleContent>
              </Collapsible>
            </SidebarGroup>
          ))}
        </div>

        {/* User Profile Section at Bottom */}
        <div className="mt-auto pt-4 border-t border-border">
          <SidebarGroup>
            <SidebarGroupLabel className="text-sm font-medium text-sidebar-foreground mb-2">
              {!collapsed && "Account"}
            </SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                <SidebarMenuItem>
                  <SidebarMenuButton asChild>
                    <NavLink
                      to="/profile"
                      className={({ isActive }) =>
                        `flex items-center space-x-3 px-3 py-2 rounded-md transition-colors ${
                          isActive
                            ? "bg-primary text-primary-foreground"
                            : "text-sidebar-foreground hover:bg-sidebar-accent"
                        }`
                      }
                    >
                      <User className="w-4 h-4" />
                      {!collapsed && <span className="text-sm">User Profile</span>}
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
                <SidebarMenuItem>
                  <SidebarMenuButton asChild>
                    <NavLink
                      to="/organization"
                      className={({ isActive }) =>
                        `flex items-center space-x-3 px-3 py-2 rounded-md transition-colors ${
                          isActive
                            ? "bg-primary text-primary-foreground"
                            : "text-sidebar-foreground hover:bg-sidebar-accent"
                        }`
                      }
                    >
                      <Building2 className="w-4 h-4" />
                      {!collapsed && <span className="text-sm">Organization</span>}
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        </div>
      </SidebarContent>
    </Sidebar>
  );
}