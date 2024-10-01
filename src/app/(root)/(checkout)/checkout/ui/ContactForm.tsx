import Link from 'next/link';
import { Check } from 'lucide-react';
import { TextInput } from '@mantine/core';
import { isEmail, useForm } from '@mantine/form';
import { useEffect, useState } from 'react';

import Checkbox from '@/components/Checkbox';
import { cn } from '@/shared/lib/utils';
import {
  selectCheckout,
  setContactData,
} from '@/shared/redux/checkout/checkoutSlice';
import { useAppDispatch, useAppSelector } from '@/shared/redux/store';
import ContactLogin from './ContactLogin';
import { useAuth } from '@/shared/hooks/useAuth';
import { useScrollIntoView } from '@mantine/hooks';
import { APP_PAGES } from '@/shared/config/pages-url.config';

export default function ContactForm() {
  const { contactData } = useAppSelector(selectCheckout);
  const { isAuth, currentUser } = useAuth();
  const [isLogin, setIsLogin] = useState(false);
  const [isCompleted, setIsCompleted] = useState(false);
  const dispatch = useAppDispatch();
  const { scrollIntoView, targetRef } = useScrollIntoView<HTMLDivElement>({
    offset: 600,
  });

  useEffect(() => {
    if (isAuth) {
      if (contactData?.email !== currentUser?.email)
        dispatch(
          setContactData({ email: currentUser?.email, subscription: true })
        );
      setIsCompleted(true);
    }
  }, [isAuth, currentUser, contactData, dispatch]);

  const form = useForm({
    mode: 'uncontrolled',
    initialValues: {
      email: '',
      subscription: true,
    },
    validate: {
      email: isEmail('Invalid email'),
    },
  });

  type FormData = typeof form.values;

  const onSubmit = (formData: FormData) => {
    dispatch(setContactData(formData));
    setIsCompleted(true);
    scrollIntoView();
  };

  const handleCompleted = () => {
    form.setValues({
      email: contactData?.email || '',
      subscription: contactData?.subscription || true,
    });
    setIsCompleted(false);
  };

  return (
    <div className='bg-brand-grey-200 p-6'>
      {!isCompleted && (
        <>
          <div className='flex items-baseline justify-between border-b border-b-brand-grey-400 pb-3'>
            <h2 className='text-xl/6 font-bold'>Contact</h2>

            {isLogin ? (
              <Link href={APP_PAGES.FORGOT_PASSWORD} className='text-sm/normal'>
                Forgot Password?
              </Link>
            ) : (
              <span className='text-base'>
                Have an account?{' '}
                <button
                  type='button'
                  onClick={() => setIsLogin(true)}
                  className='text-brand-orange-400'
                >
                  Sign in
                </button>
              </span>
            )}
          </div>
          {isLogin ? (
            <ContactLogin
              setIsCompleted={setIsCompleted}
              setIsLogin={setIsLogin}
            />
          ) : (
            <form className='pt-4' onSubmit={form.onSubmit(onSubmit)}>
              <div className='mb-8 space-y-1'>
                <label className='text-sm/normal'>Email</label>
                <TextInput
                  {...form.getInputProps('email')}
                  key={form.key('email')}
                  classNames={{
                    root: 'form-root',
                    label: 'form-label',
                    input: cn(
                      'form-input',
                      form?.errors?.email &&
                        'border-brand-red-400 text-secondary'
                    ),
                    error: 'text-brand-red-400',
                  }}
                />
              </div>

              <Checkbox
                label='Email me with news and offers'
                {...form.getInputProps('subscription', { type: 'checkbox' })}
                key={form.key('subscription')}
                classNames={{
                  body: 'flex items-center',
                  label: 'text-sm/normal',
                }}
              />

              <button className={cn('btn btn-primary mt-8 w-full')}>
                Continue to Shipping Options
              </button>
            </form>
          )}
        </>
      )}

      {isCompleted && (
        <div>
          <div className='space-y-5'>
            <div className='flex items-center gap-2'>
              {isAuth ? (
                <h3 className='text-xl/6 font-bold'>
                  Welcome, {currentUser?.firstName} {currentUser?.lastName}
                </h3>
              ) : (
                <h3 className='text-xl/6 font-bold'>Welcome, guest!</h3>
              )}

              <Check />
            </div>

            <div className='flex items-baseline justify-between'>
              <div className='flex gap-4'>
                <p className='font-bold'>Email</p>
                <p>{contactData?.email}</p>
              </div>
              {!isAuth && (
                <button
                  type='button'
                  className='relative font-bold after:absolute after:bottom-0 after:left-0 after:h-px after:w-full after:bg-secondary'
                  onClick={handleCompleted}
                >
                  Edit
                </button>
              )}
            </div>
          </div>
          <div ref={targetRef} />
        </div>
      )}
    </div>
  );
}
