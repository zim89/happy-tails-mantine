import { auth } from '@/shared/auth/auth';

export default async function Page() {
  const session = await auth();
  console.log(session);

  return (
    <div>
      <h1>Profile of </h1>
    </div>
  );
}
