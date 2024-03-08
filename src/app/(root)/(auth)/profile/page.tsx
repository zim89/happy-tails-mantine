import { auth } from '@/shared/auth/auth';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: "Happy Tails | Profile",
  description: null
}

export default async function Page() {
  const session = await auth();

  return (
    <div>
      <h1>Profile of </h1>
    </div>
  );
}
