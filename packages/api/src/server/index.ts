import type { AuthInstance } from '@repo/auth/server';
import type { DatabaseInstance } from '@repo/db/client';
import tweetRouter from './router/tweet';
import { createTRPCContext as createTRPCContextInternal, router } from './trpc';

export const createApi = ({
  auth,
  db,
}: {
  auth: AuthInstance;
  db: DatabaseInstance;
}) => {
  return {
    trpcRouter: router({
      tweets: tweetRouter,
    }),
    createTRPCContext: ({ headers }: { headers: Headers }) =>
      createTRPCContextInternal({ auth, db, headers }),
  };
};

export const appRouter = router({
  tweets: tweetRouter,
});

export type AppRouter = typeof appRouter;
