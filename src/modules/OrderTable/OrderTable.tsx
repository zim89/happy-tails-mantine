'use client';

import { useFindManyQuery } from '@/shared/api/ordersApi';
import Table from './components/Table';
import mock from './mock.json';

export default function OrderTable() {
  const { data, error, isLoading } = useFindManyQuery({ page: 0, limit: 10 });

  return <Table data={mock.content} />;

  // if (isLoading) return;

  // if (error) return;

  // if (data) return <Table data={data.content} />;

  // return 'No data';
}
