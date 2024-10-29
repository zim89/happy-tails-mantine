import { Textarea, UnstyledButton } from '@mantine/core';
import { useForm, hasLength } from '@mantine/form';

import { cn } from '@/shared/lib/utils';
import { Container } from './Container';
import classes from '../classes.module.css';
import { useReplyMutation } from '@/shared/api/feedbackApi';
import { toast } from 'react-toastify';
import type { Feedback } from '@/shared/types/feedback.types';

export const ReplyMessage = ({ message }: { message: Feedback }) => {
  const [sendReply, isLoading] = useReplyMutation();

  const form = useForm({
    initialValues: {
      content: '',
    },
    validate: {
      content: hasLength(
        { min: 30 },
        'Minimum message length is 30 characters. Please extend your message.'
      ),
    },
  });

  const handleSubmit = async (values: typeof form.values) => {
    try {
      await sendReply({ id: message.id, ...values }).unwrap();
      toast.success('Reply sent successfully!');
      form.reset();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Container>
      <div className='mt-10 rounded-tl rounded-tr border border-[#EEE] bg-white px-4 py-[22px]'>
        <h3 className='text-xl font-bold'>New Message</h3>
      </div>
      <form onSubmit={form.onSubmit(handleSubmit)} className={classes.form}>
        <div className={classes.message}>
          <Textarea
            classNames={{
              root: 'form-root',
              label: 'form-label whitespace-pre',
              input: cn(
                'form-input',
                form?.errors?.content && 'border-brand-red-400 text-secondary'
              ),
              error: 'form-error',
            }}
            {...form.getInputProps('content')}
            label='Enter your answer or message here'
            rows={12}
          />
        </div>
        <UnstyledButton
          disabled={message.replyOfManager ? true : false}
          type='submit'
          classNames={{
            root: 'py-[10px] px-[54px] bg-black text-white rounded-sm mt-6 font-bold disabled:opacity-40',
          }}
        >
          Send
        </UnstyledButton>
      </form>
    </Container>
  );
};
