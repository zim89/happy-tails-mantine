'use client';

import axios from 'axios';
import { useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function Page() {
  const [error, setError] = useState<any>(null);
  const params = useSearchParams();

  useEffect(() => {
    const fn = async () => {
      if (params.get('code')) {
        try {
          const code = params.get('code')!;

          const form = new FormData();
          form.append('grant_type', 'authorization_code');
          form.append('code', code);
          form.append(
            'client_id',
            process.env.NEXT_PUBLIC_SKETCHFAB_CLIENT_ID!
          );
          form.append(
            'client_secret',
            process.env.NEXT_PUBLIC_SKETCHFAB_CLIENT_SECRET!
          );
          form.append('redirect_uri', 'http://localhost:3000/auth/sketchfab');

          const res = await axios.post(
            'https://sketchfab.com/oauth2/token/',
            form
          );

          ('EkAkkur7tRQsJlz0mXfRxRT10pgaJO');

          console.log(res);
          // router.push('/');
        } catch (err) {
          console.log(err);
          setError(err);
        }
      }
    };

    fn();
  }, []);

  if (error) {
    return <p>Something bad happened...</p>;
  }
}
