'use client';

import { Popover, Select, UnstyledButton } from '@mantine/core';
import { useState, useEffect } from 'react';
import { Check, X, ChevronDown } from 'lucide-react';

import { Order } from '@/shared/types/types';
import { orderStatusList, isOrderStatus } from '@/shared/lib/constants';
import {
  brandNotification,
  isAxiosQueryError,
  isErrorDataString,
} from '@/shared/lib/helpers';
import { useChangeStatusMutation } from '@/shared/api/ordersApi';

type Props = {
  children(toggle: () => void): React.ReactNode;
  orderRow: Order;
};
export default function UpdateStatus({ children, orderRow }: Props) {
  const [dispatch] = useChangeStatusMutation();

  const [opened, setOpened] = useState(false);
  const [selectedOption, setSelectedOption] = useState<
    (typeof orderRow)['orderStatus']
  >(orderRow.orderStatus);

  const toggle = () => {
    setOpened((o) => !o);
  };

  const close = () => {
    setOpened(false);
  };

  // After a table row (especially order status) is changed, update select input
  useEffect(() => {
    setSelectedOption(orderRow.orderStatus);
  }, [orderRow.orderStatus]);

  const handleSubmit = async () => {
    try {
      await dispatch({
        number: orderRow.number,
        status: selectedOption,
      }).unwrap();
      close();
      brandNotification('SUCCESS', 'Changes saved!');
    } catch (err) {
      if (isAxiosQueryError(err)) {
        brandNotification(
          'ERROR',
          isErrorDataString(err.data) ? err.data : err.data.message
        );
      }
      close();
    }
  };

  return (
    <>
      <Popover
        opened={opened}
        onChange={setOpened}
        position='left'
        withArrow
        arrowSize={18}
        shadow='md'
      >
        <Popover.Target>{children(toggle)}</Popover.Target>
        <Popover.Dropdown classNames={{ dropdown: 'p-0' }}>
          <div className='bg-brand-grey-300 px-2 py-1 text-sm font-black uppercase text-brand-grey-800'>
            Edit
          </div>
          <div className='flex gap-4 px-2 py-4'>
            <Select
              value={selectedOption}
              classNames={{
                input: 'form-input',
              }}
              // To prevent closing of the popover while clicking over combobox
              comboboxProps={{
                withinPortal: false,
              }}
              onChange={(option) =>
                setSelectedOption((prev) =>
                  isOrderStatus(option) ? option : prev
                )
              }
              data={orderStatusList}
              rightSection={<ChevronDown size={16} color='black' />}
            />
            <div>
              <UnstyledButton
                classNames={{ root: 'bg-secondary mr-2 p-[10px] rounded-sm' }}
                onClick={handleSubmit}
              >
                <Check size={16} color='white' />
              </UnstyledButton>
              <UnstyledButton
                classNames={{
                  root: 'p-[10px] rounded-sm relative z-10',
                }}
                styles={{ root: { border: '1px solid #C8C8C8' } }}
                onClick={close}
              >
                <X size={16} color='black' />
              </UnstyledButton>
            </div>
          </div>
        </Popover.Dropdown>
      </Popover>
    </>
  );
}
