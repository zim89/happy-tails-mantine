'use client';
import { getAnalytics, refreshAccessToken } from '@/shared/api/seoApi';
import { useEffect, useState } from 'react';

type Props = {
  verification: any
}
export default function Analitycs({ verification }: Props) {
  const [res, setRes] = useState<string>();
  
  useEffect(() => {
    if (!verification.access_token) return;
    (async () => {
      const res = await getAnalytics({
        startDate: '2024-03-01',
        endDate: '2024-03-25',
        verification,
      });
      
      setRes(JSON.stringify(res?.data));
    })();

  }, [verification.access_token]);

  return <pre>{res}</pre>;
}
