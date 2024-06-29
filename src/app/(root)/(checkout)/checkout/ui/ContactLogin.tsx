import Checkbox from '@/components/Checkbox';
import Loader from '@/components/Loader';
import { useLoginMutation } from '@/shared/api/authApi';
import { cn } from '@/shared/lib/utils';
import { setAuthData } from '@/shared/redux/auth/authSlice';
import { setContactData } from '@/shared/redux/checkout/checkoutSlice';
import { useAppDispatch } from '@/shared/redux/store';
import { PasswordInput, TextInput } from '@mantine/core';
import { hasLength, isEmail, useForm } from '@mantine/form';
import { Eye, EyeOff } from 'lucide-react';
import { toast } from 'react-toastify';

export default function ContactLogin({
  setIsCompleted,
  setIsLogin,
}: {
  setIsCompleted: (value: boolean) => void;
  setIsLogin: (value: boolean) => void;
}) {
  const dispatch = useAppDispatch();
  const [login, { isLoading }] = useLoginMutation();

  const form = useForm({
    initialValues: {
      email: '',
      password: '',
      subscription: true,
    },
    validate: {
      email: isEmail('Invalid email'),
      password: hasLength({ min: 1 }, 'Password must have 6 or more symbols'),
    },
  });

  type FormData = typeof form.values;

  const onSubmit = async (formData: FormData) => {
    const { email, password, subscription } = formData;

    try {
      const response = await login({ email, password }).unwrap();
      dispatch(setAuthData(response));
      dispatch(setContactData({ email, subscription }));
      setIsCompleted(true);
    } catch (error) {
      console.log(error);
      toast.error('Oops! Something went wrong! Try again later.');
    }
  };

  const onGuestCheckout = () => {
    setIsLogin(false);
  };

  return (
    <form className='py-4' onSubmit={form.onSubmit(onSubmit)}>
      <h3 className='mb-4 text-base font-bold'>
        Sign in for a faster checkout
      </h3>

      <div className='space-y-4'>
        {/* Email */}
        <div className='space-y-1'>
          <label className='text-sm/normal'>Email</label>
          <TextInput
            {...form.getInputProps('email')}
            classNames={{
              root: 'form-root',
              label: 'form-label',
              input: cn(
                'form-input',
                form?.errors?.email && 'border-brand-red-400 text-secondary'
              ),
              error: 'text-brand-red-400',
            }}
          />
        </div>

        {/* Password */}
        <div className='space-y-1'>
          <label className='text-sm/normal'>Password</label>
          <PasswordInput
            {...form.getInputProps('password')}
            radius='xs'
            visibilityToggleIcon={({ reveal }) =>
              reveal ? (
                <Eye className='h-5 w-5 text-brand-grey-400' />
              ) : (
                <EyeOff className='h-5 w-5 text-brand-grey-400' />
              )
            }
            classNames={{
              root: 'form-root',
              label: 'form-label',
              input: cn(
                'form-input',
                'pr-11',
                form?.errors?.password && 'border-brand-red-400 text-secondary'
              ),
              visibilityToggle: 'text-secondary',
              error: 'text-brand-red-400',
            }}
          />
        </div>

        {/* Subscription */}
        <Checkbox
          label='Email me with news and offers'
          {...form.getInputProps('subscription', { type: 'checkbox' })}
          classNames={{
            body: 'flex items-center',
            label: 'text-sm/normal',
          }}
        />

        {/* Actions */}
        <div className='grid grid-cols-2 gap-4 pt-2'>
          <button
            type='button'
            className={cn('btn btn-secondary w-full')}
            onClick={onGuestCheckout}
          >
            Guest Checkout
          </button>
          <button
            type='submit'
            className={cn(
              'btn btn-primary disabled:btn-disabled relative flex w-full items-center justify-center gap-2'
            )}
            disabled={isLoading}
          >
            {isLoading && <Loader />}
            Sign in
          </button>
        </div>
      </div>
    </form>
  );
}
