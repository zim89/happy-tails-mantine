'use client';

import { UnstyledButton } from '@mantine/core';
import { PlusCircle } from 'lucide-react';
import { useState } from 'react';

import { deliveries } from '../lib/data';
import { ShippingForm } from './ShippingForm';
import { AddShippingMethodForm } from './AddShippingMethodForm';
import { useGetShippingMethodsQuery } from '@/shared/api/shippingMethodsApi';
import { DeliverySttingSkeleton } from './skeletons/DeliverySettingSkeleton';

export const DeliverySetting = () => {
  const [isAdding, setIsAdding] = useState(false);
  const { data, error, isLoading } = useGetShippingMethodsQuery();

  if (error)
    return (
      <p>
        {`Whoops, it shouldn't have happened, our experts are already fixing this.`}
      </p>
    );

  if (isLoading) return <DeliverySttingSkeleton />;

  return (
    <div>
      {data?.content.map((del, index) => (
        <ShippingForm
          key={index}
          option={del}
          deleteBtn={deliveries.length > 1}
        />
      ))}
      {deliveries.length <= 6 &&
        (!isAdding ? (
          <UnstyledButton
            className='mt-6 flex items-center gap-2 rounded-sm bg-secondary px-4 py-[10px] text-sm font-black text-primary'
            onClick={setIsAdding.bind(null, true)}
          >
            <PlusCircle width={20} />
            Add new shipping method
          </UnstyledButton>
        ) : (
          <>
            <AddShippingMethodForm onClose={() => setIsAdding(false)} />
          </>
        ))}
    </div>
  );
};
