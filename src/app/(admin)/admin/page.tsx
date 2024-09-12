'use client';

import { useSearchParams } from 'next/navigation';
import { useContext, useEffect } from 'react';

import BarChart from '@/modules/BarChart';
import LineChart from '@/modules/LineChart';
import OrdersChart from '@/modules/OrdersChart';
import Stats from '@/modules/Stats';
import TopCategories from '@/modules/TopCategories';
import { AdminPanelContext } from '@/shared/context/panel.context';

export default function Page() {
  const params = useSearchParams();
  const code = params.get('code');

  const { update } = useContext(AdminPanelContext);

  useEffect(() => {
    update((prev) => ({ ...prev, openedLink: 'Dashboard' }));
  }, []);

  return (
    <div className='flex flex-col gap-6'>
      <Stats />
      <BarChart />
      <OrdersChart />
      <TopCategories />
      <LineChart />
    </div>
  );
}
