import {
  FileInput,
  Modal,
  Textarea,
  TextInput,
  Tooltip,
  UnstyledButton,
} from '@mantine/core';
import { Paperclip, X } from 'lucide-react';
import axios, { AxiosError } from 'axios';
import { useDisclosure } from '@mantine/hooks';
import { hasLength, isEmail, useForm } from '@mantine/form';

import { cn } from '@/shared/lib/utils';
import Checkbox from '@/components/Checkbox';
import classes from './ProblemReport.module.css';
import { ThankYouModal } from '@/app/(root)/profile/components/ThankYouModal';
import { useCreateMutation } from '@/shared/api/feedbackApi';
import { toast } from 'react-toastify';
import { useState } from 'react';
import Loader from '@/components/Loader/Loader';
import { wait } from '@/shared/lib/helpers';
import { publishImage } from '@/shared/lib/requests';

export default function ProblemReport() {
  const [formVisible, { open: openForm, close: closeForm }] = useDisclosure();
  const [dispatch] = useCreateMutation();
  const [isSent, { open, close }] = useDisclosure();
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm({
    initialValues: {
      userName: '',
      email: '',
      content: '',
      termsOfService: false,
      file: null as File | null,
    },

    validate: {
      email: isEmail('Invalid email'),
      content: hasLength({ min: 30, max: 255 }, 'Please describe your problem'),
      userName: hasLength({ min: 2 }, 'Field must have 2 or more characters'),
      termsOfService: (value) =>
        !value && 'You must agree to the Terms of Service',
    },
  });

  const handleSubmit = async ({
    email,
    content,
    userName,
    file,
  }: (typeof form)['values']) => {
    try {
      let request = {
        userEmail: email,
        userName,
        imageSrc: [''],
        content,
      };

      if (file) {
        request.imageSrc = [
          await publishImage(file, `PROBLEM REPORT by ${email}`),
        ];
      }

      setIsLoading(true);
      // Awaits 5 seconds for more natural appearing of modals
      await wait();
      await dispatch(request).unwrap();

      // Reset and close the form
      setIsLoading(false);
      form.reset();
      closeForm();

      // Open 'Thank You' modal
      open();
    } catch (err) {
      setIsLoading(false);
      console.error(err);
      if (err instanceof AxiosError) {
        return toast.error(err.message);
      } else {
        return toast.error('Uh-oh, some error occurred, please try again!');
      }
    }
  };

  return (
    <>
      <UnstyledButton className={classes.reportButton} onClick={openForm}>
        Report a problem
      </UnstyledButton>

      <Modal
        size={572}
        opened={formVisible}
        classNames={{
          header: 'hidden',
          body: 'p-0',
          content: classes.customScroll,
        }}
        onChange={() => {}}
        onClose={closeForm}
      >
        <span
          className='absolute right-4 top-6 cursor-pointer'
          onClick={closeForm}
        >
          <X />
        </span>
        <hgroup className='p-12 pb-8 text-center'>
          <h1 className='mb-4 text-4xl/[2.7rem] capitalize'>
            Warranty and returns
          </h1>
          <p>
            {`Thank you for choosing Happy Tails! If you're facing an issue
                with your purchase, please fill out the form below to initiate a
                warranty claim or return. Our team will promptly review your
                request and provide further instructions.`}
          </p>
        </hgroup>
        <form
          className={classes.modalForm}
          onSubmit={form.onSubmit((values) => handleSubmit(values))}
        >
          <TextInput
            {...form.getInputProps('userName')}
            type='text'
            label='Name'
            classNames={{
              root: 'form-root mb-7',
              label: 'form-label',
              input: cn(
                'form-input md:w-[458px] lg:w-[315px]',
                form?.errors?.userName && 'border-brand-red-400 text-secondary'
              ),
              error: 'form-error',
            }}
          />

          <TextInput
            {...form.getInputProps('email')}
            type='text'
            label='Email'
            classNames={{
              root: 'form-root mb-7',
              label: 'form-label',
              input: cn(
                'form-input md:w-[458px] lg:w-[315px]',
                form?.errors?.email && 'border-brand-red-400 text-secondary'
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
                  'form-input max-h-[230px] md:w-[458px] lg:w-[315px]',
                  form?.errors?.content && 'border-brand-red-400 text-secondary'
                ),
                error: 'form-error',
              }}
              {...form.getInputProps('content')}
              label='Enter your question or message here'
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

          <UnstyledButton className={classes.terms}>
            <Checkbox
              tabIndex={-1}
              size='xs'
              mr={8}
              classNames={{
                input: 'cursor-pointer',
                error: 'form-error p-0',
              }}
              aria-hidden
              color='#161616'
              {...form.getInputProps('termsOfService', {
                type: 'checkbox',
              })}
            />

            <span>
              After reading the <a href='#'>privacy policy</a>, I consent to the
              processing of my personal data, which will be used to answer my
              questions.
            </span>
          </UnstyledButton>

          <UnstyledButton
            disabled={!!form.errors['termsOfService'] || isLoading}
            type='submit'
          >
            {isLoading && <Loader size={14} c='white' mr={10} />}
            Send
          </UnstyledButton>
        </form>
      </Modal>
      <ThankYouModal opened={isSent} close={close} />
    </>
  );
}
