'use client';
import { ChevronDown } from 'lucide-react';
import clsx from 'clsx';
import Image from 'next/image';
import Link from 'next/link';
import {
  Checkbox,
  NumberFormatter,
  Popover,
  Radio,
  TextInput,
} from '@mantine/core';
import { hasLength, isEmail, useForm, isNotEmpty } from '@mantine/form';

import {
  selectCart,
  selectCartTotalPrice,
} from '@/shared/redux/cart/cartSlice';
import { useAppSelector } from '@/shared/redux/store';

import visaImg from '@/assets/icons/additional/visa.svg';
import mastercardImg from '@/assets/icons/additional/mastercard.svg';

export default function CheckoutForm() {
  const cart = useAppSelector(selectCart);
  const cartTotalPrice = useAppSelector(selectCartTotalPrice);

  const form = useForm({
    initialValues: {
      email: '',
      subscribe: false,
      firstName: '',
      secondName: '',
      country: '',
      city: '',
      street: '',
      apartment: '',
      savedData: false,
      shippingMethod: 'standard',
      paymentMethod: 'cash',
      sameDeliveryBillingAddress: true,
      termsAgreed: true,
      promoCode: '',
    },

    validate: {
      email: isEmail('Invalid email'),
      firstName: hasLength({ min: 2 }, 'Enter your first name'),
      secondName: hasLength({ min: 2 }, 'Enter your last name'),
      street: isNotEmpty('Enter your street'),
      apartment: isNotEmpty('Enter your apartment'),
      termsAgreed: isNotEmpty('You must agree to accept the terms'),
    },
  });

  const additional = { discount: 10, tax: 0, shipping: 0 } as const;
  const shipping = form.values.shippingMethod === 'fast' ? 8 : 4;
  const totalPrice =
    cartTotalPrice - additional.discount + additional.tax + shipping;

  return (
    <form
      className={'pb-[72px] pt-5 md:pb-[68px] md:pt-6 lg:pb-20'}
      onSubmit={form.onSubmit(async (values) => {
        console.log(values);
      })}
    >
      <div className={'flex flex-col gap-12 lg:flex-row lg:gap-6'}>
        <div className={'flex flex-col gap-4 lg:w-[580px]'}>
          <h2
            className={
              'hidden border-b border-b-brand-grey-300 pb-2 text-[28px]/normal font-bold uppercase md:block'
            }
          >
            Checkout
          </h2>

          {/* Contacts */}
          <div
            className={
              'flex flex-col gap-4 bg-brand-grey-200 px-6 py-4 md:px-10 lg:px-7'
            }
          >
            <div
              className={
                'flex items-center justify-between border-b border-b-brand-grey-400 pb-3'
              }
            >
              <h3 className={'text-xl/normal font-bold'}>Contact</h3>
              <p className={'text-sm/normal'}>
                Have an account?{' '}
                <Link href={'/auth'} className={'text-brand-orange-400'}>
                  Log in
                </Link>
              </p>
            </div>

            <TextInput
              {...form.getInputProps('email')}
              placeholder={'Enter your Email'}
              classNames={{
                root: 'form-root',
                label: 'form-label',
                input: 'form-input',
                error: 'form-error',
              }}
            />

            <Checkbox
              mb={12}
              {...form.getInputProps('subscribe')}
              label='Email me with news and offers'
              classNames={{
                root: 'group',
                body: 'checkbox-body',
                inner: 'checkbox-inner',
                input: 'checkbox-input',
                label: 'checkbox-label',
              }}
            />
          </div>

          {/*  Delivery Options */}
          <div
            className={
              'flex flex-col gap-4 bg-brand-grey-200 px-6 py-4 md:px-10 lg:px-7'
            }
          >
            <h3
              className={
                'border-b border-b-brand-grey-400 pb-3 text-xl/normal font-bold'
              }
            >
              Delivery Options
            </h3>

            <div
              className={
                'grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-x-7 md:gap-y-2'
              }
            >
              {/*Input First Name*/}
              <div className={'flex flex-col gap-2'}>
                <label className={'text-sm/normal'}>First name</label>
                <TextInput
                  {...form.getInputProps('firstName')}
                  placeholder={'Enter your first name'}
                  classNames={{
                    root: 'form-root',
                    label: 'form-label',
                    input: 'form-input',
                    error: 'form-error',
                  }}
                />
              </div>

              {/*Input Second Name*/}
              <div className={'flex flex-col gap-2'}>
                <label className={'text-sm/normal'}>Second name</label>
                <TextInput
                  {...form.getInputProps('secondName')}
                  placeholder={'Enter your second name'}
                  classNames={{
                    root: 'form-root',
                    label: 'form-label',
                    input: 'form-input',
                    error: 'form-error',
                  }}
                />
              </div>

              {/*Input Country*/}
              <div className={'flex flex-col gap-2'}>
                <label className={'text-sm/normal'}>Country</label>
                <TextInput
                  {...form.getInputProps('country')}
                  placeholder={'Enter your country'}
                  classNames={{
                    root: 'form-root',
                    label: 'form-label',
                    input: 'form-input',
                    error: 'form-error',
                  }}
                />
              </div>

              {/*Input City*/}
              <div className={'flex flex-col gap-2'}>
                <label className={'text-sm/normal'}>City</label>
                <TextInput
                  {...form.getInputProps('city')}
                  placeholder={'Enter your city'}
                  classNames={{
                    root: 'form-root',
                    label: 'form-label',
                    input: 'form-input',
                    error: 'form-error',
                  }}
                />
              </div>

              {/*Input Street*/}
              <div className={'flex flex-col gap-2'}>
                <label className={'text-sm/normal'}>Street</label>
                <TextInput
                  {...form.getInputProps('street')}
                  placeholder={'Enter your street'}
                  classNames={{
                    root: 'form-root',
                    label: 'form-label',
                    input: 'form-input',
                    error: 'form-error',
                  }}
                />
              </div>

              {/*Input Apartment*/}
              <div className={'flex flex-col gap-2'}>
                <label className={'text-sm/normal'}>Apartment</label>
                <TextInput
                  {...form.getInputProps('apartment')}
                  placeholder={'Enter your apartment'}
                  classNames={{
                    root: 'form-root',
                    label: 'form-label',
                    input: 'form-input',
                    error: 'form-error',
                  }}
                />
              </div>
            </div>

            <Checkbox
              {...form.getInputProps('savedData')}
              label='Save the entered data for registration'
              classNames={{
                root: 'group',
                body: 'checkbox-body',
                inner: 'checkbox-inner',
                input: 'checkbox-input',
                label: 'checkbox-label',
              }}
            />
          </div>

          {/*  Shipping Method */}
          <div
            className={
              'flex flex-col gap-4 bg-brand-grey-200 px-6 py-4 md:px-10 lg:px-7'
            }
          >
            <h3
              className={
                'border-b border-b-brand-grey-400 pb-3 text-xl/normal font-bold'
              }
            >
              Shipping Method
            </h3>

            <Radio.Group
              mb={16}
              {...form.getInputProps('shippingMethod')}
              name='shippingMethod'
              withAsterisk
            >
              <div
                className={clsx(
                  'mb-4 flex items-center justify-between border border-brand-grey-400 bg-primary px-4 py-2 text-base font-bold text-brand-grey-900',
                  form.values.shippingMethod === 'standard' &&
                    'border-secondary'
                )}
              >
                <div className={'flex items-center gap-2'}>
                  <Radio
                    value='standard'
                    classNames={{
                      root: 'group',
                      inner: 'radio-inner',
                      radio: 'radio-radio',
                    }}
                  />
                  <label>Standard Shipping</label>
                </div>

                <p
                  className={
                    'hidden text-sm/normal font-normal text-brand-grey-900 md:block'
                  }
                >
                  by the 5th of June, 08:00-21:00
                </p>

                <NumberFormatter prefix='$ ' value={4} decimalScale={2} />
              </div>
              <div
                className={clsx(
                  'flex items-center justify-between border border-brand-grey-400 bg-primary px-4 py-2 text-base font-bold text-brand-grey-900',
                  form.values.shippingMethod === 'fast' && 'border-secondary'
                )}
              >
                <div className={'flex items-center gap-2'}>
                  <Radio
                    value='fast'
                    classNames={{
                      root: 'group',
                      inner: 'radio-inner',
                      radio: 'radio-radio',
                    }}
                  />
                  <label>Fast Shipping</label>
                </div>

                <p
                  className={
                    'hidden text-sm/normal font-normal text-brand-grey-900 md:block'
                  }
                >
                  Tomorrow, the 2nd of June, 08:00-12:00
                </p>

                <NumberFormatter prefix='$ ' value={8} decimalScale={2} />
              </div>
            </Radio.Group>
          </div>

          {/*  Payment Method */}
          <div
            className={
              'flex flex-col gap-4 bg-brand-grey-200 px-6 py-4 md:px-10 lg:px-7'
            }
          >
            <h3
              className={
                'border-b border-b-brand-grey-400 pb-3 text-xl/normal font-bold'
              }
            >
              Payment Method
            </h3>

            <Radio.Group
              mb={16}
              {...form.getInputProps('paymentMethod')}
              name='paymentMethod'
              withAsterisk
            >
              <div className={'flex flex-col gap-4'}>
                <div
                  className={clsx(
                    'flex items-center justify-between border border-brand-grey-400 bg-primary px-4 py-2 text-base font-bold text-brand-grey-900',
                    form.values.paymentMethod === 'card' && 'border-secondary'
                  )}
                >
                  <div className={'flex items-center gap-2'}>
                    <Radio
                      value='card'
                      classNames={{
                        root: 'group',
                        inner: 'radio-inner',
                        radio: 'radio-radio',
                      }}
                    />
                    <label>Credit or Debit Card</label>
                  </div>

                  <div className={'flex gap-2'}>
                    <div
                      className={
                        'flex h-7 w-10 items-center justify-center rounded-0.5 border border-brand-grey-400 bg-brand-grey-200'
                      }
                    >
                      <Image
                        src={mastercardImg}
                        alt={'Mastercard'}
                        width={24}
                        height={19}
                      />
                    </div>
                    <div
                      className={
                        'flex h-7 w-10 items-center justify-center rounded-0.5 border border-brand-grey-400 bg-brand-grey-200'
                      }
                    >
                      <Image
                        src={visaImg}
                        alt={'Visa card'}
                        width={24}
                        height={19}
                        style={{ width: 'auto' }}
                      />
                    </div>
                  </div>
                </div>

                {form.values.paymentMethod === 'card' && (
                  <p
                    className={
                      'bg-brand-green-200 px-4 py-3 text-base text-brand-green-400'
                    }
                  >
                    Our manager will contact you and provide the details for
                    payment for the goods
                  </p>
                )}

                <div
                  className={clsx(
                    'mb-4 flex items-center border border-brand-grey-400 bg-primary px-4 py-2 text-base font-bold text-brand-grey-900',
                    form.values.paymentMethod === 'cash' && 'border-secondary'
                  )}
                >
                  <div className={'flex items-center gap-2'}>
                    <Radio
                      value='cash'
                      classNames={{
                        root: 'group',
                        inner: 'radio-inner',
                        radio: 'radio-radio',
                      }}
                    />
                    <label>Cash Payment</label>
                  </div>
                </div>
              </div>
            </Radio.Group>
          </div>

          <div className={'flex flex-col gap-2'}>
            <Checkbox
              {...form.getInputProps('sameDeliveryBillingAddress')}
              label='Billing Adress Same As Delivery'
              classNames={{
                root: 'group',
                body: 'checkbox-body',
                inner: 'checkbox-inner',
                input: 'checkbox-input',
                label: 'checkbox-label',
              }}
            />
            <Checkbox
              {...form.getInputProps('termsAgreed')}
              label='By Clicking Place Order I Agree To The Terms'
              classNames={{
                root: 'group',
                body: 'checkbox-body',
                inner: 'checkbox-inner',
                input: 'checkbox-input',
                label: 'checkbox-label',
                labelWrapper: 'relative',
                error: 'form-error',
              }}
            />
          </div>
        </div>

        <div className={'flex flex-col gap-9'}>
          <div className={'flex flex-col gap-6 bg-brand-grey-200 p-6'}>
            <h3
              className={
                'border-b border-b-brand-grey-400 pb-3 text-xl/normal font-bold'
              }
            >
              Items: {cart.length}
            </h3>

            <ul className={'flex flex-col gap-3'}>
              {cart.map((product) => (
                <li key={product.id} className={'flex gap-6'}>
                  <div
                    className={
                      'h-[72px] w-[72px] flex-none self-start rounded-0.5 border border-brand-grey-400 bg-primary p-1'
                    }
                  >
                    <Image
                      src={product.imagePath}
                      alt={product.name}
                      height={64}
                      width={64}
                      style={{ objectFit: 'contain' }}
                    />
                  </div>

                  <div className={'flex grow flex-col gap-1'}>
                    <p className={'text-xs/normal'}>{product.article}</p>
                    <div className={'flex items-center justify-between'}>
                      <p className={'line-clamp-1 text-base font-bold'}>
                        {product.name}
                      </p>
                      <NumberFormatter
                        prefix='$ '
                        value={product.count * product.price}
                        decimalScale={2}
                        className={'whitespace-nowrap pl-2 text-xl/normal'}
                      />
                    </div>
                    <p className={'text-xs/normal'}>
                      Quantity: {product.count}
                    </p>
                  </div>
                </li>
              ))}
            </ul>

            <div className={'flex items-center justify-between'}>
              <p className={'text-base font-bold'}>Have a promo code?</p>
              <Popover
                trapFocus
                position='bottom-end'
                shadow='md'
                withArrow
                arrowOffset={20}
                arrowPosition='side'
              >
                <Popover.Target>
                  <button
                    type={'button'}
                    className={
                      'flex items-center gap-1 text-sm/normal text-brand-orange-400'
                    }
                  >
                    Enter Code Here
                    <ChevronDown className={'mt-[2px] h-4 w-4'} />
                  </button>
                </Popover.Target>
                <Popover.Dropdown>
                  <div className={'px-2 pt-3'}>
                    <TextInput
                      {...form.getInputProps('promoCode')}
                      placeholder={'Enter promo code'}
                      classNames={{
                        root: 'form-root',
                        label: 'form-label',
                        input: 'form-input',
                      }}
                    />
                  </div>
                </Popover.Dropdown>
              </Popover>
            </div>

            <ul
              className={
                'flex flex-col gap-2 border-b border-b-brand-grey-400 pb-3'
              }
            >
              <li className={'flex items-center justify-between text-base'}>
                <p>Subtotal:</p>
                <NumberFormatter
                  prefix='$ '
                  value={cartTotalPrice}
                  decimalScale={2}
                  className={'whitespace-nowrap text-xl/normal'}
                />
              </li>
              <li className={'flex items-center justify-between text-base'}>
                <p>Discount:</p>
                <NumberFormatter
                  prefix='$ '
                  value={additional.discount}
                  decimalScale={2}
                  className={'whitespace-nowrap text-xl/normal'}
                />
              </li>
              <li className={'flex items-center justify-between text-base'}>
                <p>Tax:</p>
                <NumberFormatter
                  prefix='$ '
                  value={additional.tax}
                  decimalScale={2}
                  className={'whitespace-nowrap text-xl/normal'}
                />
              </li>
              <li className={'flex items-center justify-between text-base'}>
                <p>Shipping:</p>
                <NumberFormatter
                  prefix='$ '
                  value={shipping}
                  decimalScale={2}
                  className={'whitespace-nowrap text-xl/normal'}
                />
              </li>
            </ul>

            <div
              className={
                'flex items-center justify-between text-xl/normal font-bold'
              }
            >
              <p className={'uppercase'}>Total</p>
              <NumberFormatter
                prefix='$ '
                value={Math.max(0, totalPrice)}
                decimalScale={2}
                className={'whitespace-nowrap'}
              />
            </div>
          </div>
          <button
            type='submit'
            className={
              'btn btn-primary w-full md:mx-auto md:block md:w-[374px] lg:w-full'
            }
          >
            Place Order
          </button>
        </div>
      </div>
    </form>
  );
}