'use client';

import { UnstyledButton } from '@mantine/core';
import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import Link from 'next/link';

import { OrderTabs } from '@/app/(root)/profile/components/OrderTabs';
import { useFindManyByEmailQuery } from '@/shared/api/ordersApi';
import classes from '../styles.module.css';
import { cn } from '@/shared/lib/utils';
import { mapFilterToDate } from '@/shared/helpers/date.helpers';

export const OrderHistoryDisplay = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const { data } = useFindManyByEmailQuery({
    page: currentPage - 1,
    limit: 1000000000000,
    sort: ['createdDate', 'DESC'],
  });

  const [filtered, setFiltered] = useState(data?.content || []);

  const params = useSearchParams();
  const router = useRouter();

  const searchParam = params.get('search');
  const pageParam = params.get('page');
  const filterParam = params.get('filter');

  useEffect(() => {
    if (searchParam?.trim() && data) {
      setFiltered(
        data.content.filter(
          (order) =>
            order.orderStatus
              .toLowerCase()
              .includes(searchParam.toLowerCase()) ||
            order.number.toLowerCase().includes(searchParam.toLowerCase())
        )
      );
    } else if (data) {
      setFiltered(data.content);
    }
  }, [searchParam]);

  useEffect(() => {
    if (filterParam?.trim()) {
      setFiltered((prev) =>
        prev.filter((item) => item.createdDate >= mapFilterToDate(filterParam!))
      );
    }
  }, [filterParam]);

  useEffect(() => {
    pageParam ? setCurrentPage(Number(pageParam)) : router.replace('?page=1');
  }, [pageParam]);

  useEffect(() => {
    if (data) {
      setCurrentPage(1); // Reset page when new data is received
      setFiltered(data!.content); // Reset filtered orders when new data is received
      router.replace('?page=1'); // Reset search query when new data is received
    }
  }, [data]);

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
        <OrderTabs orders={filtered} />
      ) : (
        <div className={classes.box}>
          <hgroup>
            <h1 className='text-2xl font-light md:whitespace-pre'>
              Your Order History is Currently Empty,{' '}
              <span className='text-brand-orange-800'>Start Shopping now</span>
            </h1>
            <p className={classes.boxParagraph}>
              Your Order History keeps track of all your purchases, making it
              easy to view, manage, and repurchase your favorite items. Once you
              start shopping with us, your orders will appear here, complete
              with all the details you need. Start exploring our wide range of
              products and find something that catches your eye!
            </p>
          </hgroup>
          <UnstyledButton className='btn mb-8 bg-secondary font-bold text-primary'>
            <Link href='/products'>Continue shopping</Link>
          </UnstyledButton>
        </div>
      )}
    </>
  );
};
