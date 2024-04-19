'use client';

import { useFindManyQuery } from '@/shared/api/ordersApi';
import Table from './components/Table';
import mock from './mock.json';
import { useAuth } from '@/shared/hooks/useAuth';
import OrderCounter from '@/components/OrderCounter';
import { calculateOrders } from '@/shared/lib/helpers';

export default function OrderTable() {
  // const { access_token } = useAuth();
  // const { data, error, isLoading } = useFindManyQuery({
  //   page: 0,
  //   limit: 10,
  //   token: access_token,
  // });

  const calculated = calculateOrders(mock.content);
  
  return (
    <>
      <OrderCounter
        className='mb-[1.875rem]'
        newOrders={calculated["New"] || 0}
        inProgress={calculated["In Progress"] || 0}
        completed={calculated["Completed"] || 0}
        canceled={calculated["Cancelled"] || 0}
      />
      <Table data={mock.content} />
    </>
  );

  // if (isLoading) return;

  // if (error) return;

  // if (data) return <Table data={data.content} />;

  // return 'No data';
}
