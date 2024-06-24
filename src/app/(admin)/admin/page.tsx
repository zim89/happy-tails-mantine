'use client';

import Notify from '@/components/Notify';
import BarChart from '@/modules/BarChart';
import LineChart from '@/modules/LineChart';
import OrdersChart from '@/modules/OrdersChart';
import Stats from '@/modules/Stats';
import TopCategories from '@/modules/TopCategories';
import { getAccessToken, retrieveToken } from '@/shared/api/seoApi';
import { KEYS } from '@/shared/constants/localStorageKeys';
import { notifyContext } from '@/shared/context/notification.context';
import { AdminPanelContext } from '@/shared/context/panel.context';
import { AlertTriangle, Check } from 'lucide-react';
import { redirect, useSearchParams } from 'next/navigation';
import { useContext, useEffect, useState } from 'react';

export default function Page() {
  const tokenFromStore = retrieveToken();
  const [token, setToken] = useState(tokenFromStore);
  const { props, clear, setParams } = useContext(notifyContext);

  const params = useSearchParams();
  const code = params.get('code');

  const { update } = useContext(AdminPanelContext);

  useEffect(() => {
    update((prev) => ({ ...prev, openedLink: 'Dashboard' }));

    setParams({
      failed: {
        color: 'transparent',
        icon: <AlertTriangle size={24} fill='#DC362E' />,
        text: 'Order creation failed!',
      },
      success: {
        color: '#389B48',
        icon: <Check size={24} />,
        text: 'Order creation succeded!',
      },
    });
  }, []);

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
      <Notify {...props} onClose={clear} />
    </div>
  );
}
