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
import { useForm } from '@mantine/form';

import Breadcrumbs from '@/components/Breadcrumbs';
import { postRequest, Credentials } from '@/shared/api/contactsApi';
import { readTextFileAsPromise } from '@/shared/lib/utils';

import styles from './styles.module.css';

export default function ContactsPage() {
  const form = useForm({
    initialValues: {
      userName: '',
      userEmail: '',
      content: '',
      termsOfService: false,
      file: null as File | null,
    },

    validate: {
      userEmail: (value) =>
        /^[\w\-\.]+@([\w-]+\.)+[\w-]{2,}$/gm.test(value)
          ? null
          : 'The email you entered did not match our record. Please double check and try again.',
      content: (value, { file }) =>
        // If there is a file attached, ignore it
        !value.length && !file
          ? 'Hey, you forgot to write down the message!'
          : null,
      userName: (value) =>
        value.length <= 2 ? "Come on, you have a name, don't you?" : null,
      termsOfService: (value) =>
        !value ? "We won't steal your data. Rest assured!" : null,
    },
  });

  const handleSubmit = async ({
    content,
    userEmail,
    userName,
    file,
  }: (typeof form)['values']) => {
    let request: Credentials = {
      content,
      userEmail,
      userName,
    };

    if (file) {
      // Load a file and replace a message's content
      let res = await readTextFileAsPromise(file);
      request.content = res;
    }

    // Make a request to feedback-controller
    const res = await postRequest(request);
    form.reset();
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
          <div className={styles.field}>
            <TextInput
              withErrorStyles
              {...form.getInputProps('userName')}
              type='text'
              label='Name'
            />
          </div>

          <div className={styles.field}>
            <TextInput
              withErrorStyles
              {...form.getInputProps('userEmail')}
              type='text'
              label='Email'
            />
          </div>

          <div className={styles.message}>
            <Textarea
              withErrorStyles
              styles={{
                label: {
                  minWidth: '100%',
                },
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
                accept='.txt'
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

          <button type='submit'>Send</button>
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
