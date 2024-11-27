import Link from 'next/link';
import { Test } from './Test';

export default function Page() {
  return (
    <div>
      <Test />
      <Link
        href={`https://sketchfab.com/oauth2/authorize/?response_type=code&client_id=PDMyVoPrUkWaByuEsyEV0QeXKDaZoy86Imc6XRLq&redirect_uri=http://localhost:3000/auth/sketchfab`}
      >
        Log in
      </Link>
    </div>
  );
}
