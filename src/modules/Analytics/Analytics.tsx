'use client';
import { getAnalytics } from '@/shared/api/seoApi';
import { useEffect, useState } from 'react';

export default function Analitycs() {
  const [res, setRes] = useState<string>();
  
  useEffect(() => {
    (async () => {
      const res = await getAnalytics({
        startDate: '2024-03-01',
        endDate: '2024-03-25'
      });
      
      setRes(JSON.stringify(res?.data));
    })();

  }, []);

  return <pre>{res}</pre>;
}
