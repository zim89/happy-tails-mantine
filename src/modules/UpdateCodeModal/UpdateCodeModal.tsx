'use client';

import { Modal, TextInput, UnstyledButton } from '@mantine/core';
import { isNotEmpty, useForm } from '@mantine/form';
import { useDisclosure } from '@mantine/hooks';
import { useContext } from 'react';
import { DateInput } from '@mantine/dates';
import { Calendar, X } from 'lucide-react';

import ModalFooter from '@/components/ModalFooter';
import ModalHeader from '@/components/ModalHeader';
import { notifyContext } from '@/shared/context/notification.context';
import { isAxiosQueryError, isErrorDataString } from '@/shared/lib/helpers';
import { cn } from '@/shared/lib/utils';

import classes from './classes.module.css';
import {
  Discount,
  useUpdateDiscountCodeMutation,
} from '@/shared/api/discountApi';

type Props = {
  promoCode: Discount;
};

export default function UpdateCodeModal({ promoCode }: Props) {
  const [dispatch] = useUpdateDiscountCodeMutation();
  const { setNotification } = useContext(notifyContext);

  const uniqueExpirationDateId = `${Date.now()}_updateExpirationDate`;
  const uniqueStartingDateId = `${Date.now()}_updateStartDate`;

  const [opened, { open, close }] = useDisclosure(false);
  const form = useForm({
    initialValues: {
      discount: promoCode.discount,
      minPrice: promoCode.minPrice,
      beginningDate: new Date(promoCode.beginningDate) as Date | null,
      expirationDate: new Date(promoCode.expirationDate) as Date | null,
    },

    validate: {
      discount: (val) =>
        val < 1 ? 'The discount should be more that zero.' : null,
      minPrice: (val) =>
        val < 1 ? 'The minimum order price should be more that zero.' : null,
      beginningDate: isNotEmpty('Starting date should be filled.'),
      expirationDate: isNotEmpty('Expiration date should be filled.'),
    },
  });

  const clearAndClose = () => {
    form.reset();
    close();
  };

  const handleSubmit = async (body: (typeof form)['values']) => {
    const { hasErrors } = form.validate();
    if (hasErrors) return;

    try {
      let requestBody = {
        id: promoCode.id,
        code: promoCode.code,
        discount: body.discount,
        minPrice: body.minPrice,
        beginningDate: body.beginningDate!.getTime(),
        expirationDate: body.expirationDate!.getTime(),
      };

      await dispatch(requestBody).unwrap();

      clearAndClose();
      setNotification('Success', 'Changes saved!');
    } catch (err) {
      clearAndClose();
      if (isAxiosQueryError(err)) {
        setNotification(
          'Failed',
          isErrorDataString(err.data) ? err.data : err.data.message
        );
      }
      console.error(err);
    }
  };

  return (
    <>
      <UnstyledButton className={classes.actionButton} onClick={() => open()}>
        Edit
      </UnstyledButton>

      <Modal
        size={694}
        opened={opened}
        classNames={{
          header: classes.modalHeader,
          content: classes.modalContent,
        }}
        onClose={close}
      >
        <ModalHeader heading='Edit promo code' handleClose={close} />

        <form className='grid grid-cols-2 grid-rows-2 gap-x-12 gap-y-[30px]'>
          <TextInput
            classNames={{
              root: 'form-root',
              label: 'form-label',
              wrapper:
                'flex border-2 p-[2px] border-brand-grey-400 gap-2 focus:outline outline-2',
              section: 'static w-auto text-secondary whitespace-nowrap',
              input: cn(
                'form-input rounded-sm border-0 p-0 pl-3 outline-none',
                form?.errors?.discount && 'form-error--input'
              ),
              error: 'form-error',
            }}
            withErrorStyles
            type='number'
            label='Discount, %'
            {...form.getInputProps('discount')}
          />
          <TextInput
            classNames={{
              root: 'form-root',
              label: 'form-label',
              wrapper:
                'flex border-2 p-[2px] border-brand-grey-400 gap-2 focus:outline outline-2 rounded-sm',
              section: 'static w-auto text-secondary whitespace-nowrap',
              input: cn(
                'form-input rounded-sm border-0 p-0 pl-3 outline-none',
                form?.errors?.minPrice && 'form-error--input'
              ),
              error: 'form-error',
            }}
            withErrorStyles
            type='number'
            label='Min order amount, $'
            {...form.getInputProps('minPrice')}
          />
          <DateInput
            id={uniqueStartingDateId}
            {...form.getInputProps('beginningDate')}
            classNames={{
              input:
                'font-inter text-sm text-secondary pl-4 h-10 border-2 rounded-sm border-brand-grey-400',
            }}
            label='Promo code start date'
            placeholder='___.___.______'
            rightSection={
              <div
                data-filled={!!form.values.beginningDate}
                className='mr-4 flex gap-[10px] data-[filled=true]:mr-12'
              >
                {form.values.beginningDate && (
                  <X
                    size={20}
                    color='black'
                    className='cursor-pointer'
                    onClick={() => {
                      form.setFieldValue('beginningDate', null);
                    }}
                  />
                )}
                <label
                  htmlFor={uniqueStartingDateId}
                  className='cursor-pointer'
                >
                  <Calendar
                    size={20}
                    className='rounded-sm bg-brand-grey-300 p-[1px]'
                  />
                </label>
              </div>
            }
          />
          <DateInput
            id={uniqueExpirationDateId}
            {...form.getInputProps('expirationDate')}
            classNames={{
              input:
                'font-inter text-sm text-secondary pl-4 h-10 border-2 rounded-sm border-brand-grey-400',
            }}
            label='Promo code expiration date'
            placeholder='___.___.______'
            rightSection={
              <div
                data-filled={!!form.values.expirationDate}
                className='mr-4 flex gap-[10px] data-[filled=true]:mr-12'
              >
                {form.values.expirationDate && (
                  <X
                    size={20}
                    color='black'
                    className='cursor-pointer'
                    onClick={() => {
                      form.setFieldValue('expirationDate', null);
                    }}
                  />
                )}
                <label
                  htmlFor={uniqueExpirationDateId}
                  className='cursor-pointer'
                >
                  <Calendar
                    size={20}
                    className='rounded-sm bg-brand-grey-300 p-[1px]'
                  />
                </label>
              </div>
            }
          />
        </form>

        <ModalFooter
          singleBtn={true}
          primaryBtnText='Save changes'
          primaryBtnClassName='p-[10px] px-10 bg-secondary text-primary rounded-sm font-bold cursor-pointer'
          primaryBtnOnClick={() => handleSubmit(form.values)}
        />
      </Modal>
    </>
  );
}
