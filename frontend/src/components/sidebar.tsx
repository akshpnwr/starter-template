import { UserPlus, Users, Building } from 'lucide-react';
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from '@/components/ui/sidebar';
import { Link, LinkProps, useLocation } from '@tanstack/react-router';
import { SidebarFooterUser } from './sidebar-footer-user';
import { useUserStore } from '@/stores/useUserStore';

interface LinkType extends LinkProps {
  label: string;
  icon: React.ElementType;
}
const menuItems: LinkType[] = [
  { icon: Users, label: 'Users', to: '/users' },
  { icon: UserPlus, label: 'Add user', to: '/users/add' },
];

export function AppSidebar() {
  const pathname = useLocation({ select: (location) => location.pathname });
  const { user } = useUserStore();

  return (
    <Sidebar className="bg-sidebar-bg text-sidebar-text w-64">
      <SidebarHeader className="h-16 border-b border-sidebar-border">
        <div className="flex h-full items-center gap-3 text-xl font-bold">
          <div className="rounded-lg bg-black p-2">
            <Building className="h-6 w-6 text-white" />
          </div>
          Real Estate
        </div>
      </SidebarHeader>
      <SidebarContent>
        <SidebarMenu className="gap-0">
          {menuItems.map((item) => (
            <SidebarMenuItem key={item.to}>
              <SidebarMenuButton
                asChild
                isActive={pathname === item.to}
                className="data-[active=true]:bg-neutral-800 data-[active=true]:text-white"
              >
                <Link
                  to={item.to}
                  className="flex items-center gap-3 rounded-none py-5 pl-3"
                >
                  <item.icon className="h-4 w-4" />
                  <span>{item.label}</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarContent>
      {user && (
        <SidebarFooter className="items-end">
          <SidebarFooterUser user={user} />
        </SidebarFooter>
      )}
    </Sidebar>
  );
}
