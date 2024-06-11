import { Paperclip } from 'lucide-react';
import {
  FileInput,
  TextInput,
  Textarea,
  Tooltip,
  UnstyledButton,
} from '@mantine/core';
import { isInRange, isNotEmpty, useForm } from '@mantine/form';

import { cn } from '@/shared/lib/utils';
import { Container } from './Container';
import classes from '../classes.module.css';

type Props = {
  threadId: number;
};

export const ReplyMessage = ({ threadId }: Props) => {
  const form = useForm({
    initialValues: {
      title: '',
      content: '',
      file: null as File | null,
    },
    validate: {
      title: isInRange({ min: 6 }, 'Please enter a bigger title'),
      content: isNotEmpty('Please enter a message'),
    },
  });

  const handleSubmit = (values: typeof form.values) => {};

  return (
    <Container>
      <div className='mt-10 rounded-tl rounded-tr border border-[#EEE] bg-white px-4 py-[22px]'>
        <h3 className='text-xl font-bold'>New Message</h3>
      </div>
      <form onSubmit={form.onSubmit(handleSubmit)} className={classes.form}>
        <TextInput
          {...form.getInputProps('title')}
          type='text'
          label='Subject'
          classNames={{
            root: 'form-root mb-7',
            label: 'form-label',
            input: cn(
              'form-input',
              form?.errors?.title && 'border-brand-red-400 text-secondary'
            ),
            error: 'form-error',
          }}
        />

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

          <div className='absolute bottom-0'>
            <FileInput
              variant='unstyled'
              className='w-6 opacity-0'
              {...form.getInputProps('file')}
              accept='.jpeg,.jpg,.png,.gif,.apng,.tiff'
            />
            <Tooltip label='Attach file' className='pointer-events-none'>
              <Paperclip color={form.values.file ? 'black' : '#999'} />
            </Tooltip>
          </div>
        </div>
        <UnstyledButton
          type='submit'
          classNames={{
            root: 'py-[10px] px-[54px] bg-black text-white rounded-sm mt-6 font-bold',
          }}
        >
          Send
        </UnstyledButton>
      </form>
    </Container>
  );
};
