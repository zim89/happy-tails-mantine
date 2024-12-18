import { Textarea, UnstyledButton } from '@mantine/core';
import { useForm, hasLength } from '@mantine/form';

import { cn } from '@/shared/lib/utils';
import { Container } from './Container';
import classes from '../classes.module.css';
import { useReplyMutation } from '@/shared/api/feedbackApi';
import type { Feedback } from '@/shared/types/feedback.types';
import { brandNotification, handleDispatchError } from '@/shared/lib/helpers';
import { handleError } from '@/shared/helpers/error.helpers';
import { toast } from 'react-toastify';

export const ReplyMessage = ({ message }: { message: Feedback }) => {
  const [sendReply] = useReplyMutation();

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

  const processReply = async (values: typeof form.values) => {
    try {
      brandNotification('SUCCESS', 'Reply sent successfully!');
      form.reset();
      await sendReply({ id: message.id, ...values }).unwrap();
    } catch (err) {
      form.setValues(values);
      throw err;
    }
  };

  const handleSubmit = async (values: typeof form.values) => {
    try {
      await processReply(values);
    } catch (err) {
      handleError(err, toast.error);
    }
  };

  return (
    <Container>
      <div className='mt-10 rounded-tl rounded-tr border border-brand-grey-300 bg-white px-4 py-[22px]'>
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
