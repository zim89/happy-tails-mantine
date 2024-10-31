'use client';

import { useFindManyQuery } from '@/shared/api/ordersApi';
import Table from './components/Table';

export default function OrderTable() {
  const { data, error, isLoading } = useFindManyQuery({
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

  return (
    <>
      <Table data={data.content} />
    </>
  );
}
