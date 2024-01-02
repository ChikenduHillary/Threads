"use client"

import * as z from "zod"
import { useForm } from 'react-hook-form';
import { zodResolver } from "@hookform/resolvers/zod";
import { usePathname, useRouter } from 'next/navigation';
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input";
import { CommentValidation } from '@/lib/validations/thread';
import { addCommentToThread } from '@/lib/actions/thread.actions';
import Image from 'next/image';

interface Props {
    threadId: string;
    currentUserImg: string;
    currentUserId: string;
}

const Comment = ({ threadId, currentUserImg, currentUserId }: Props) => {
    const router = useRouter();
    const pathname = usePathname();

    const form = useForm({
        resolver: zodResolver(CommentValidation),
        defaultValues: {
          thread: '',
        }
    })

    
    const onSubmit = async (values: z.infer<typeof CommentValidation>) => {
      await addCommentToThread(
        threadId,
        values.thread,
        JSON.parse(currentUserId),
        pathname
      );
      
      form.reset();
    }

  return (
    <Form {...form}>
    <form className='comment-form' onSubmit={form.handleSubmit(onSubmit)}>
      <FormField
        control={form.control}
        name="thread"
        render={({ field }) => (
          <FormItem className="flex items-center gap-3 w-full">
            <FormLabel>
              <Image
                src={currentUserImg}
                alt='Profile image'
                width={48}
                height={48}
                className="roundedd-full object-cover"
              />
            </FormLabel>
            <FormControl className='no-focus border border-dark-4 bg-dark-3 text-light-1'>
              <Input
                type='text'
                placeholder="Comment..."
                className="no-focus border border-dark-4 bg-dark-3 text-light-1"
                {...field} 
              />
            </FormControl>
          </FormItem>
        )}
      />

      <Button type="submit" className='comment-form_btn'>Reply</Button>
    </form>
  </Form>
  )
}

export default Comment
