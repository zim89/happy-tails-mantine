'use client';

import { useContext, useEffect } from 'react';

import { useFindManyQuery } from '@/shared/api/ordersApi';
import Table from './components/Table';
import OrderCounter from '@/components/OrderCounter';
import { calculateOrders } from '@/shared/lib/helpers';
import styles from './styles.module.css';
import { AdminPanelContext } from '@/shared/context/panel.context';

export default function OrderTable() {
  const { data, error, isLoading } = useFindManyQuery({
    page: 0,
    limit: 1000000,
  });

  const { update } = useContext(AdminPanelContext);

  useEffect(() => {
    update((prev) => ({ ...prev, openedLink: 'Orders' }));
  }, []);

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

  const calculated = calculateOrders(data.content);

  return (
    <>
      <OrderCounter
        className={styles.counter}
        newOrders={calculated['NEW']}
        inProgress={calculated['IN_PROGRESS']}
        completed={calculated['COMPLETED']}
        canceled={calculated['CANCELLED']}
      />
      <Table data={data.content} />
    </>
  );
}
