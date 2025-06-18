import { authClient } from '@/lib/auth-client';
import { User, useUserStore } from '@/stores/useUserStore';
import { createRootRoute, Outlet } from '@tanstack/react-router';

export const Route = createRootRoute({
  component: RootComponent,
  beforeLoad: async () => {
    const { setUser } = useUserStore.getState();
    const { data } = await authClient.getSession();

    const user = data?.user;

    if (!user) return;

    const userObject = {
      id: user.id,
      createdAt: user.createdAt,
      email: user.email,
      emailVerified: user.emailVerified,
      name: user.name,
      role: user.role ?? '',
      updatedAt: user.updatedAt,
      image: user.image,
      phone: user.phone,
    } as User;

    setUser(userObject);
  },
});

function RootComponent() {
  return (
    <>
      <div className="flex min-h-screen flex-col">
        <Outlet />
      </div>
    </>
  );
}
