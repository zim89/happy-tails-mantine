'use client';

import { useFindManyQuery } from '@/shared/api/ordersApi';
import Table from './components/Table';
import { useAuth } from '@/shared/hooks/useAuth';
import OrderCounter from '@/components/OrderCounter';
import { calculateOrders } from '@/shared/lib/helpers';

export default function OrderTable() {
  const { access_token } = useAuth();
  const { data, error, isLoading } = useFindManyQuery({
    page: 0,
    limit: Infinity,
    token: access_token,
  });

  if (isLoading) return <p>Loading...</p>;

  if (!data) return <Table data={[]} />

  if (error) return <p>Oops, something went wrong...</p>;

  const calculated = calculateOrders(data.content);

  return (
    <>
      <OrderCounter
        className='mb-[1.875rem]'
        newOrders={calculated['New'] || 0}
        inProgress={calculated['In Progress'] || 0}
        completed={calculated['Completed'] || 0}
        canceled={calculated['Cancelled'] || 0}
      />
      <Table data={data.content} />
    </>
  );
}
