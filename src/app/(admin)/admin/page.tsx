'use client';

import { redirect, useSearchParams } from 'next/navigation';
import { useContext, useEffect, useState } from 'react';

import BarChart from '@/modules/BarChart';
import LineChart from '@/modules/LineChart';
import OrdersChart from '@/modules/OrdersChart';
import Stats from '@/modules/Stats';
import TopCategories from '@/modules/TopCategories';
import { getAccessToken, retrieveToken } from '@/shared/api/seoApi';
import { KEYS } from '@/shared/constants/localStorageKeys';
import { AdminPanelContext } from '@/shared/context/panel.context';

export default function Page() {
  const tokenFromStore = retrieveToken();
  const [token, setToken] = useState(tokenFromStore);

  const params = useSearchParams();
  const code = params.get('code');

  const { update } = useContext(AdminPanelContext);

  useEffect(() => {
    update((prev) => ({ ...prev, openedLink: 'Dashboard' }));
  }, []);

  useEffect(() => {
    if (!code) return;

    (async () => {
      try {
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
      } catch (err) {
        console.log(err);
        window.history.pushState({}, '', window.location.pathname);
      }
    })();
  }, [code]);

  if (!code && !token)
    return redirect(
      'https://accounts.google.com/o/oauth2/v2/auth?scope=https%3A%2F%2Fwww.googleapis.com%2Fauth%2Fwebmasters&access_type=offline&response_type=code&redirect_uri=http%3A%2F%2Flocalhost%3A3000%2Fadmin%2F&client_id=171015409943-jb4s4l6rba9c2nr9tm1r454s3kv95jpe.apps.googleusercontent.com'
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
