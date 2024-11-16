'use client';
import { Download, Paperclip } from 'lucide-react';
import axios from 'axios';
import { useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import {
  FileInput,
  Textarea,
  TextInput,
  Tooltip,
  UnstyledButton,
} from '@mantine/core';
import { hasLength, isEmail, useForm, matches } from '@mantine/form';

import Checkbox from '@/components/Checkbox';
import { postRequest } from '@/shared/api/contactsApi';
import { cn } from '@/shared/lib/utils';

import styles from '../styles.module.css';
import { IMGUR_CLIENT_ID } from '@/shared/constants/env.const';
import { APP_PAGES } from '@/shared/config/pages-url.config';
import { useEffect } from 'react';
import { useAuth } from '@/shared/hooks/useAuth';
import { FileType, FileTypeIcons } from '@/shared/constants/file-types.const';
import Image from 'next/image';
import { ImageModal } from '@/modules/ChatRoom/components/ImageModal';

export const ContactForm = () => {
  const { isAuth, currentUser } = useAuth();
  const router = useRouter();
  const params = useSearchParams();

  const state = params.get('state');

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
      content: (value) => {
        const min = hasLength(
          { min: 30 },
          'Minimum message length is 30 characters. Please extend your message.'
        )(value);
        const max = hasLength(
          { max: 255 },
          'Maximum message length is 255 characters. Please shorten your message.'
        )(value);

        return min || max;
      },
      userName: matches(/^[a-zA-Z ]+$/, 'Name should contain only letters'),
      termsOfService: (value) =>
        !value && 'You must agree to the Terms of Service',
    },
  });

  useEffect(() => {
    if (state) {
      form.setFieldValue('content', `I'm writing about an order #${state}`);
      router.replace('/contacts');
    }
    if (isAuth) {
      form.setFieldValue(
        'userName',
        `${currentUser?.firstName} ${currentUser?.lastName}`
      );
      currentUser?.emailVerified &&
        form.setFieldValue('email', `${currentUser?.email}`);
    }
  }, [state, isAuth]);

  const handleSubmit = async ({
    content,
    email,
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
        // It works only in secured connection and does not in localhost domain //
        const payload = new FormData();
        payload.append('image', file);
        payload.append('type', 'image');
        payload.append('title', 'FEEDBACK: Image Upload');
        const res = await axios.post(
          'https://api.imgur.com/3/image/',
          payload,
          {
            headers: {
              Authorization: `Bearer ${IMGUR_CLIENT_ID}`,
              'Content-Type': 'multipart/form-data',
            },
          }
        );
        request.imageSrc = [res.data.data.link];
      }

      // Make a request to feedback-controller
      await postRequest(request);
      router.push('/contacts/thank-you');
      form.reset();
    } catch (err) {
      if (err instanceof Error)
        throw new Error("Failed request, see what's happened: ", err);
    }
  };

  const fileExtension = form.values.file?.name.split('.').pop() as
    | FileType
    | undefined;

  return (
    <form
      className={styles.form}
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

      <div className={styles.message}>
        <Textarea
          classNames={{
            root: 'form-root',
            label: 'form-label whitespace-pre',
            input: cn(
              'form-input md:w-[458px] lg:w-[315px]',
              form?.errors?.content && 'border-brand-red-400 text-secondary'
            ),
            error: 'form-error -bottom-7 md:-bottom-4',
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

      {form.values.file && fileExtension && (
        <div className='mb-6'>
          <h3 className='py-4 text-base font-bold'>Attachment</h3>

          <div className='flex items-center justify-between rounded-sm border border-brand-grey-400 p-4'>
            <div className='flex flex-1 items-center gap-3'>
              <Image
                src={FileTypeIcons[fileExtension]}
                alt='File icon'
                width={24}
                height={24}
              />
              <p className='text-sm/[16.8px] font-bold'>
                {form.values.file?.name}
              </p>
            </div>
            <div className='flex items-center'>
              <ImageModal src={URL.createObjectURL(form.values.file)} />
              <a
                href={URL.createObjectURL(form.values.file)}
                download
                className='btn-icon'
              >
                <Download className='size-5' />
              </a>
            </div>
          </div>
        </div>
      )}

      <UnstyledButton className={styles.terms}>
        <Checkbox
          tabIndex={-1}
          size='xs'
          mr={8}
          classNames={{ input: 'cursor-pointer', error: 'form-error p-0' }}
          aria-hidden
          color='#161616'
          {...form.getInputProps('termsOfService', { type: 'checkbox' })}
        />

        <span>
          After reading the <Link href={APP_PAGES.POLICY}>privacy policy</Link>,
          I consent to the processing of my personal data, which will be used to
          answer my questions.
        </span>
      </UnstyledButton>

      <button disabled={!!form.errors['termsOfService']} type='submit'>
        Send
      </button>
    </form>
  );
};
