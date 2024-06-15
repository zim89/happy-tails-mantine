'use client';

import DonutChart from '@/components/DonutChart';
import BarChart from '@/modules/BarChart';
import LineChart from '@/modules/LineChart';
import OrdersChart from '@/modules/OrdersChart';
import TopCategories from '@/modules/TopCategories';
import { getAccessToken, retrieveToken } from '@/shared/api/seoApi';
import { redirect, useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function Page() {
  const tokenFromStore = retrieveToken();
  const [token, setToken] = useState(tokenFromStore);

  const params = useSearchParams();
  const code = params.get('code');

  useEffect(() => {
    if (!code) return;

    (async () => {
      const res = await getAccessToken(code);

      localStorage.setItem(
        'google_verification',
        JSON.stringify({
          access_token: res.data.tokens.access_token,
          refresh_token: res.data.tokens.refresh_token,
          expires_in: res.data.tokens.expiry_date,
        })
      );

      setToken(res.data.tokens.access_token);

      // Hide search params: code and scope
      const newRelativeUrl = window.location.pathname;
      window.history.pushState({}, '', newRelativeUrl);
    })();
  }, [code]);

  if (!token) redirect('/admin/auth');

  return (
    <div className='flex flex-col gap-6'>
      <BarChart />
      <OrdersChart />
      <TopCategories />
      <LineChart />
    </div>
  );
}
