import { useUserStore } from '@/stores/useUserStore';
import { createFileRoute, Outlet, redirect } from '@tanstack/react-router';

export const Route = createFileRoute('/_public')({
  beforeLoad: ({ location }) => {
    const { isAuthenticated } = useUserStore.getState();

    if (isAuthenticated) {
      throw redirect({ to: '/dashboard' });
    }

    if (!isAuthenticated && !location.pathname.startsWith('/auth')) {
      throw redirect({ to: '/auth/login' });
    }
  },
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <>
      <Outlet />
    </>
  );
}
