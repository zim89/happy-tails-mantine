"use client";
import { useFindManyQuery } from '@/shared/api/ordersApi';
import Table from './components/Table';
import OrderCounter from '@/components/OrderCounter';
import { calculateOrders } from '@/shared/lib/helpers';

export default function OrderTable() {
  const { data, error, isLoading } = useFindManyQuery({
    page: 0,
    limit: Infinity
  });

  if (isLoading) return <p>Loading...</p>;

  if (!data) return <Table data={[]} />

  if (error) return <p>Oops, something went wrong...</p>;

  const calculated = calculateOrders(data.content);

  return (
    <>
      <OrderCounter
        className='mb-[1.875rem]'
        newOrders={calculated['NEW']}
        inProgress={calculated['IN_PROGRESS']}
        completed={calculated['COMPLETED']}
        canceled={calculated['CANCELLED']}
      />
      <Table data={data.content} />
    </>
  );
}
