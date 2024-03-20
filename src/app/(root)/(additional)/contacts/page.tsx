'use client';
import React from 'react';
import {
  Checkbox,
  Container,
  TextInput,
  Textarea,
  Tooltip,
  UnstyledButton,
  FileInput,
} from '@mantine/core';
import { Paperclip } from 'lucide-react';
import { hasLength, isEmail, useForm } from '@mantine/form';

import Breadcrumbs from '@/components/Breadcrumbs';
import { postRequest } from '@/shared/api/contactsApi';
import { cn } from '@/shared/lib/utils';

import styles from './styles.module.css';
import axios from 'axios';

export default function ContactsPage() {
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
      content: (value, { file }) =>
        // If there is a file attached, ignore it
        !value.length && !file ? 'Please enter some content' : null,
      userName: hasLength({ min: 2 }, 'Field must have 2 or more characters'),
      termsOfService: (value) =>
        !value && 'You must agree to the Terms of Service',
    },
  });

  const handleSubmit = async ({
    content,
    email,
    userName,
    file,
  }: (typeof form)['values']) => {
    try {
      let request = {
        email,
        userName,
        imageSrc: '',
        content,
      };

      if (file) {
        // const payload = new FormData();
        // payload.append('image', file);
        // payload.append("type", "image");
        // payload.append("title", "FEEDBACK: Image Upload");
        // const res = await axios.post(
        //   'https://api.imgur.com/3/image/',
        //   payload,
        //   {
        //     headers: {
        //       Authorization: `Bearer ${process.env.NEXT_PUBLIC_IMGUR_CLIENT_ID}`,
        //       'Content-Type': 'multipart/form-data',
        //     },
        //   }
        // );
        // request.imageSrc = res.data.data.link;
      }

      // Make a request to feedback-controller
      const res = await postRequest(request);
      form.reset();
    } catch (err) {
      if (err instanceof Error)
        throw new Error("Failed request, see what's happened: ", err);
    }
  };

  return (
    <Container>
      <Breadcrumbs
        crumbs={[{ href: '/', text: 'Home' }, { text: 'Contacts' }]}
      />

      <div className={styles.content}>
        <hgroup className={styles.heading}>
          <h1>{"We'd love to hear from you!"}</h1>
          <p>
            Whether you have questions about our products, need assistance with
            an order, or just want to share stories about your furry friend,
            we&apos;re here to help.
          </p>
        </hgroup>
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

          <UnstyledButton className={styles.terms}>
            <Checkbox
              tabIndex={-1}
              size='xs'
              mr={8}
              styles={{ input: { cursor: 'pointer' } }}
              aria-hidden
              color='#161616'
              {...form.getInputProps('termsOfService', { type: 'checkbox' })}
            />

            <span>
              After reading the <a href='#'>privacy policy</a>, I consent to the
              processing of my personal data, which will be used to answer my
              questions.
            </span>
          </UnstyledButton>

          <button disabled={!!form.errors['termsOfService']} type='submit'>
            Send
          </button>
        </form>

        <p className={styles.partner_message}>
          For partnership opportunities, collaborations, or wholesale inquiries,
          please email us at partnerships@happytails.com. We&apos;re always open
          to new and exciting ventures.
        </p>
      </div>
    </Container>
  );
}
