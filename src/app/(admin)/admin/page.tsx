'use client';

import BarChart from '@/modules/BarChart';
import LineChart from '@/modules/LineChart';
import OrdersChart from '@/modules/OrdersChart';
import Stats from '@/modules/Stats';
import TopCategories from '@/modules/TopCategories';
import { getAccessToken, retrieveToken } from '@/shared/api/seoApi';
import { KEYS } from '@/shared/constants/localStorageKeys';
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
        KEYS['google_verification'],
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

  if (!code && !token)
    return redirect(
      `${process.env.NODE_ENV === 'production' ? process.env.NEXT_PUBLIC_GOOGLE_AUTH_URL_PROD : process.env.NEXT_PUBLIC_GOOGLE_AUTH_URL_DEV}`
    );

  return (
    <div className='flex flex-col gap-6'>
      <Stats />
      <BarChart />
      <OrdersChart />
      <TopCategories />
      {token && <LineChart />}
    </div>
  );
}
