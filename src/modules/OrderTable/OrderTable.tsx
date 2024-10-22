'use client';

import { useFindManyQuery } from '@/shared/api/ordersApi';
import Table from './components/Table';
import OrderCounter from '@/components/OrderCounter/OrderCounter';
import { calculateOrders } from '@/shared/lib/helpers';
import styles from './styles.module.css';

export default function OrderTable() {
  const { data, error, isLoading, isFetching } = useFindManyQuery({
    page: 0,
    limit: 100000000,
  });

  if (error)
    return (
      <p>
        {
          "This shouldn't have happened, our experts are already solving the issue. Stay tuned."
        }
      </p>
    );
  if (isLoading) return <p>Loading...</p>;
  if (!data) return <Table data={[]} />;

  if (isFetching) return <p>Fetching...</p>;

  const calculated = calculateOrders(data.content);

  return (
    <>
      <OrderCounter
        className={styles.counter}
        newOrders={calculated['NEW']}
        inProgress={calculated['IN PROGRESS']}
        completed={calculated['COMPLETED']}
        canceled={calculated['CANCELLED']}
      />
      <Table data={data.content} />
    </>
  );
}
