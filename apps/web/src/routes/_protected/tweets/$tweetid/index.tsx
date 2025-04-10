import { queryClient } from '@/clients/queryClient';
import { trpc } from '@/router';
import { tweetsLinkOptions } from '@/validations/tweets-link-options';
import { ArrowLeftIcon, ReloadIcon } from '@radix-ui/react-icons';
import { Button } from '@repo/ui/components/button';
import {
  Tooltip,
  TooltipArrow,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@repo/ui/components/tooltip';
import { Link, createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/_protected/tweets/$tweetid/')({
  loader: ({ params }) =>
    queryClient.ensureQueryData(
      trpc.tweets.one.queryOptions({ id: params.tweetid }),
    ),
  component: RouteComponent,
  errorComponent: ({ error, reset }) => {
    return (
      <div className="flex flex-col items-center w-full gap-y-3">
        <div>{error.message}</div>
        <div className="flex gap-2">
          <Button asChild variant="outline" className="w-full">
            <Link {...tweetsLinkOptions}>
              <ArrowLeftIcon />
              Go Back
            </Link>
          </Button>
          <Button
            variant="secondary"
            onClick={() => {
              // Reset the router error boundary
              reset();
            }}
            className="w-full"
          >
            Retry? <ReloadIcon />
          </Button>
        </div>
      </div>
    );
  },
});

function RouteComponent() {
  const tweet = Route.useLoaderData();

  return (
    <div className="flex flex-col px-4 w-full max-w-6xl mx-auto break-words">
      <div className="text-center p-5 rounded-2xl">
        <h1 className="text-2xl md:text-4xl font-bold">{tweet.title}</h1>
        <p className="text-sm text-gray-500 mt-2">
          Created by <span className="font-medium">{tweet.author.name}</span>,{' '}
          {tweet.createdAt.toLocaleString()}
        </p>
      </div>
      <hr className="border border-gray-500 mt-3" />

      <TooltipProvider delayDuration={0}>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              asChild
              variant="link"
              className="w-12 border border-gray-500 mt-6 hover:brightness-150"
            >
              <Link {...tweetsLinkOptions}>
                <ArrowLeftIcon />
              </Link>
            </Button>
          </TooltipTrigger>
          <TooltipContent
            side="right"
            align="center"
            sideOffset={4}
            className="bg-neutral-500 fill-neutral-500 duration-0"
          >
            <span>View all tweets</span>
            <TooltipArrow width={15} height={10} className="duration-0" />
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>

      <div className="bg-elevated shadow rounded-2xl p-6 w-full min-h-96 border border-gray-500 break-words mt-6">
        <p className="leading-relaxed whitespace-break-spaces">
          {tweet.content ?? 'No content available.'}
        </p>
      </div>
    </div>
  );
}
