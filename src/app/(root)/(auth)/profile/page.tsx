import { getServerSession } from 'next-auth';
import { authConfig } from '@/auth';

export default async function Page() {
  const session = await getServerSession(authConfig);
  console.log(session?.user);
  return (
    <div>
      <h1>Profile of </h1>
    </div>
  );
}
