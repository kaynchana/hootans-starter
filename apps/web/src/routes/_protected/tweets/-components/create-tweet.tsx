import { trpc } from '@/router';
import FormFieldInfo from '@/routes/-components/common/form-field-info';
import Spinner from '@/routes/-components/common/spinner';
import { PlusIcon } from '@radix-ui/react-icons';
import { Button } from '@repo/ui/components/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@repo/ui/components/dialog';
import { Input } from '@repo/ui/components/input';
import { Label } from '@repo/ui/components/label';
import { Textarea } from '@repo/ui/components/textarea';
import { useForm } from '@tanstack/react-form';
import { useMutation, useQuery } from '@tanstack/react-query';
import { TRPCClientError } from '@trpc/client';
import { useState } from 'react';
import { toast } from 'sonner';
import * as v from 'valibot';

const FormSchema = v.object({
  title: v.pipe(
    v.string(),
    v.minLength(3, 'Please enter at least 3 characters'),
  ),
  content: v.pipe(
    v.string(),
    v.minLength(5, 'Please enter at least 5 characters'),
  ),
});

export default function CreateTweetButton() {
  const getAllTweetsQuery = useQuery(trpc.tweets.all.queryOptions());
  const createTweetMutation = useMutation(trpc.tweets.create.mutationOptions());
  const [openDialog, setOpenDialog] = useState(false);

  const form = useForm({
    defaultValues: {
      title: ``,
      content: ``,
    },
    validators: {
      onChange: FormSchema,
    },
    onSubmit: async ({ value, formApi }) => {
      try {
        await createTweetMutation.mutateAsync({
          title: value.title,
          content: value.content,
        });
        setOpenDialog(false);
        await getAllTweetsQuery.refetch();
        formApi.reset();
        toast.success('Your tweet has been created!');
      } catch (error) {
        if (error instanceof TRPCClientError) {
          toast.error(error.message);
        } else {
          toast.error('An unknown error has occurred. Please try again!');
        }
      }
    },
  });

  return (
    <Dialog open={openDialog} onOpenChange={setOpenDialog}>
      <DialogTrigger asChild>
        <Button>
          <PlusIcon />
          Create
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-[90vw] xl:max-w-screen-lg data-[state=open]:slide-in-from-right-1/3 data-[state=closed]:slide-out-to-right-1/3">
        <DialogHeader>
          <DialogTitle>Create Tweet</DialogTitle>
          <DialogDescription>
            Write about an interesting topic!
          </DialogDescription>
        </DialogHeader>
        <form
          className="flex flex-col gap-y-3"
          onSubmit={(e) => {
            e.preventDefault();
            e.stopPropagation();
            form.handleSubmit();
          }}
        >
          <div>
            <form.Field
              name="title"
              children={(field) => {
                return (
                  <>
                    <Label htmlFor={field.name}>Title</Label>
                    <Input
                      className="mt-2"
                      id={field.name}
                      name={field.name}
                      value={field.state.value}
                      onBlur={field.handleBlur}
                      onChange={(e) => field.handleChange(e.target.value)}
                    />
                    <FormFieldInfo field={field} />
                  </>
                );
              }}
            />
          </div>
          <div>
            <form.Field
              name="content"
              children={(field) => {
                return (
                  <>
                    <Label htmlFor={field.name}>Content</Label>
                    <Textarea
                      className="mt-2"
                      rows={8}
                      id={field.name}
                      name={field.name}
                      value={field.state.value}
                      onBlur={field.handleBlur}
                      onChange={(e) => field.handleChange(e.target.value)}
                    />
                    <FormFieldInfo field={field} />
                  </>
                );
              }}
            />
          </div>
          <DialogFooter>
            <form.Subscribe
              selector={(state) => [state.canSubmit, state.isSubmitting]}
              children={([canSubmit, isSubmitting]) => (
                <Button
                  type="submit"
                  disabled={!canSubmit}
                  className="mt-3 h-10 w-24"
                >
                  {isSubmitting ? <Spinner /> : `Create`}
                </Button>
              )}
            />
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
