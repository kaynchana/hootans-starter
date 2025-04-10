import { trpc } from '@/router';
import Spinner from '@/routes/-components/common/spinner';
import { Button } from '@repo/ui/components/button';
import {
  Tooltip,
  TooltipArrow,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@repo/ui/components/tooltip';
import { cn } from '@repo/ui/lib/utils';
import { useMutation, useQuery } from '@tanstack/react-query';
import type { ReactNode } from '@tanstack/react-router';
import { toast } from 'sonner';

export default function DeleteTweetButton({
  children,
  className,
  tweetId,
}: Readonly<{
  children: ReactNode;
  className?: string;
  tweetId: string;
}>) {
  const { refetch } = useQuery(trpc.tweets.all.queryOptions());

  const deleteTweetMutation = useMutation(
    trpc.tweets.delete.mutationOptions({
      onError: (error) => {
        toast.error(error.message);
      },
      onSuccess: async () => {
        await refetch();
        toast.info('Tweet deleted successfully.');
      },
    }),
  );
  return (
    <TooltipProvider delayDuration={0}>
      <Tooltip>
        <TooltipTrigger asChild>
          <Button
            disabled={deleteTweetMutation.isPending}
            onClick={(e) => {
              e.preventDefault();
              deleteTweetMutation.mutate({ id: tweetId });
            }}
            variant="destructive"
            className={cn('h-9 w-10', className)}
          >
            {deleteTweetMutation.isPending ? <Spinner /> : children}
          </Button>
        </TooltipTrigger>
        <TooltipContent
          side="left"
          align="center"
          sideOffset={4}
          className="bg-neutral-500 fill-neutral-500 duration-0"
        >
          <span>Delete Tweet</span>
          <TooltipArrow width={15} height={10} className="duration-0" />
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}
