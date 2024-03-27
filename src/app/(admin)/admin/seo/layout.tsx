'use client';
import { useSearchParams } from 'next/navigation';
import { useEffect } from 'react';

import { getAccessToken, refreshAccessToken } from '@/shared/api/seoApi';

type Props = {
  children: React.ReactNode;
};

export default function Layout({ children }: Props) {
  const params = useSearchParams();
  const code = params.get('code');

  useEffect(() => {
    if (!code) return;

    (async () => {
      const candidate = localStorage.getItem('google_verification');
      let verification = candidate ? JSON.parse(candidate) : null;

      // If there is no verification, get an access token
      if (!verification) {
        const res = await getAccessToken(code);

        localStorage.setItem(
          'google_verification',
          JSON.stringify({
            access_token: res.data.tokens.access_token,
            refresh_token: res.data.tokens.refresh_token,
            expires_in: res.data.tokens.expiry_date,
          })
        );
        // But if there is a verification, but outdated, exchange a refresh token to access token
      } 
      else if (verification.expires_in < Date.now()) {
        const refresh_token = verification.refresh_token;
        const res = await refreshAccessToken(refresh_token);
        
        localStorage.setItem(
          'google_verification',
          JSON.stringify({
            access_token: res.data.accessToken,
            expires_in: res.data.expiryDate,
          })
        );
      }

      // Hide search params: code and scope
      const newRelativeUrl = window.location.pathname;
      window.history.pushState({}, '', newRelativeUrl);
    })();
  }, [code]);

  return <>{children}</>;
}
