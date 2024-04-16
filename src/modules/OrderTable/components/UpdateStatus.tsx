import { Button, Popover, Select } from '@mantine/core';
import { useState } from 'react';
import { Check, X, ChevronDown } from 'lucide-react';

import { Order } from '@/shared/types/types';

type Props = {
  children(toggle: () => void): React.ReactNode;
  orderRow: Order;
};
export default function UpdateStatus({ children, orderRow }: Props) {
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

  return (
    <Popover
      opened={opened}
      onChange={setOpened}
      position='left'
      withArrow
      arrowSize={18}
      shadow='md'
    >
      <Popover.Target>{children(toggle)}</Popover.Target>
      <Popover.Dropdown classNames={{ dropdown: "p-0" }}>
        <div className="bg-[#EEEEEE] text-[#787878] text-sm font-black uppercase px-2 py-1">
            Edit
        </div>
        <div className='flex gap-4 py-4 px-2'>
          <Select
            value={selectedOption}
            classNames={{
              input: 'form-input',
            }}
            // To prevent closing of the popover while clicking over combobox
            comboboxProps={{
                withinPortal: false
            }}
            onChange={(option) => setSelectedOption((prev) => option || prev)}
            data={[
              'SHIPPED',
              'IN PROGRESS',
              'NEW',
              'CANCELLED',
              'COMPLETED',
              'RETURN PROCESSING',
              'PROCESSING',
            ]}
            rightSection={<ChevronDown size={16} color='black' />}
          />
          <div>
            <Button classNames={{ root: 'bg-black mr-2' }}>
              <Check size={16} />
            </Button>
            <Button
              classNames={{ root: 'border-[1px] border-[#EEE]' }}
              onClick={close}
            >
              <X size={16} color='black' />
            </Button>
          </div>
        </div>
      </Popover.Dropdown>
    </Popover>
  );
}
