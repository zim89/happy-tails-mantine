'use client';

import { useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';

import { HistoryList } from '@/app/(root)/profile/components/HistoryList';
import { useFindManyByEmailQuery } from '@/shared/api/ordersApi';
import { cn } from '@/shared/lib/utils';

import { EmptyHistory } from './EmptyHistory';
import { filterOrders, searchOrders } from '../lib/utils';
import { HistorySkeleton } from './HistorySkeleton';

export const OrderHistoryDisplay = () => {
  const { data, isLoading } = useFindManyByEmailQuery({
    page: 0,
    limit: 1000000000000,
    sort: ['createdDate', 'desc'],
  });

  const [filtered, setFiltered] = useState(data?.content || []);

  const params = useSearchParams();

  const searchParam = params.get('search');
  const filterParam = params.get('filter');

  useEffect(() => {
    if (data) {
      if (filterParam) {
        setFiltered(() => filterOrders(data.content, filterParam));
      } else if (searchParam) {
        setFiltered(() => searchOrders(data.content, searchParam));
      } else {
        setFiltered(data.content);
      }
    }
  }, [data, filterParam]);

  useEffect(() => {
    if (data) {
      if (searchParam) {
        setFiltered(() => searchOrders(data.content, searchParam));
      } else if (filterParam) {
        setFiltered(() => filterOrders(data.content, filterParam));
      } else {
        setFiltered(data.content);
      }
    }
  }, [data, searchParam]);

  if (isLoading) return <HistorySkeleton />;
  if (!data) return;

  return (
    <>
      <h1
        className={cn(
          'heading mt-10 hidden px-6 lg:block',
          data.content.length === 0 && 'text-center'
        )}
      >
        Order History
      </h1>
      {data.content.length > 0 ? (
        <HistoryList orders={filtered} />
      ) : (
        <EmptyHistory />
      )}
    </>
  );
};
