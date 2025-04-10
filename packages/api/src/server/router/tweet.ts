import { desc, eq } from '@repo/db';
import { CreateTweetSchema, tweet, user } from '@repo/db/schema';

import { TRPCError } from '@trpc/server';
import * as v from 'valibot';
import { protectedProcedure, publicProcedure, router } from '../trpc';

const tweetRouter = router({
  all: protectedProcedure.query(({ ctx }) => {
    return ctx.db.query.tweet.findMany({
      columns: {
        id: true,
        title: true,
        createdAt: true,
      },
      orderBy: desc(tweet.createdAt),
    });
  }),

  one: publicProcedure
    .input(v.object({ id: v.pipe(v.string(), v.uuid()) }))
    .query(async ({ ctx, input }) => {
      const [dbTweet] = await ctx.db
        .select({
          id: tweet.id,
          title: tweet.title,
          content: tweet.content,
          createdAt: tweet.createdAt,
          author: {
            id: user.id,
            name: user.name,
          },
        })
        .from(tweet)
        .innerJoin(user, eq(tweet.createdBy, user.id))
        .where(eq(tweet.id, input.id));

      if (!dbTweet) {
        throw new TRPCError({
          code: 'BAD_REQUEST',
          message: `No such tweet with ID ${input.id}`,
        });
      }
      return dbTweet;
    }),

  create: protectedProcedure
    .input(CreateTweetSchema)
    .mutation(async ({ ctx, input }) => {
      await ctx.db.insert(tweet).values({
        createdBy: ctx.session.user.id,
        ...input,
      });
      return {};
    }),

  delete: protectedProcedure
    .input(v.object({ id: v.pipe(v.string(), v.uuid()) }))
    .mutation(async ({ ctx, input }) => {
      const res = await ctx.db.delete(tweet).where(eq(tweet.id, input.id));
      if (res.rowCount === 0) {
        throw new TRPCError({
          code: 'BAD_REQUEST',
          message: `No such tweet with id ${input.id}`,
        });
      }
      return {};
    }),
});

export default tweetRouter;
