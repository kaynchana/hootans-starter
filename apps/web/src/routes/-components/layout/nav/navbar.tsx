import type { AuthSession } from '@/clients/authClient';
import NavContainer from '@/routes/-components/layout/nav/nav-container';
import UserAvatar from '@/routes/-components/layout/nav/user-avatar';
import { tweetsLinkOptions } from '@/validations/tweets-link-options';
import { Link } from '@tanstack/react-router';

const activeClassName = 'underline decoration-2 opacity-70';

export function Navbar({ session }: Readonly<{ session: AuthSession }>) {
  return (
    <NavContainer>
      <div className="flex gap-x-4">
        <Link
          to="/"
          activeProps={{ className: activeClassName }}
          activeOptions={{ exact: true }}
        >
          Home
        </Link>
        {session?.user ? (
          <Link
            {...tweetsLinkOptions}
            activeProps={{ className: activeClassName }}
          >
            Tweets
          </Link>
        ) : null}
      </div>
      {session?.user ? (
        <UserAvatar user={session.user} />
      ) : (
        <div className="flex gap-x-2 justify-between">
          <Link
            to="/login"
            activeProps={{ className: activeClassName }}
            activeOptions={{ exact: true }}
          >
            Login
          </Link>
          <span>|</span>
          <Link
            to="/register"
            activeProps={{ className: activeClassName }}
            activeOptions={{ exact: true }}
          >
            Register
          </Link>
        </div>
      )}
    </NavContainer>
  );
}
