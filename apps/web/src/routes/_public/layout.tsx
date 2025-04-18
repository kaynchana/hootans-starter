import { authClient } from '@/clients/authClient';
import Spinner from '@/routes/-components/common/spinner';
import { Navigate, Outlet, createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/_public')({
  component: Layout,
});

function Layout() {
  const { data: session, isPending } = authClient.useSession();

  if (isPending) {
    return <Spinner />;
  }

  if (!session?.user) {
    return <Outlet />;
  }

  return <Navigate to="/" />;
}
