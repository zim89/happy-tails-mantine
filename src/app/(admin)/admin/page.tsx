import BarChart from '@/modules/BarChart';
import LineChart from '@/modules/LineChart';
import OrdersChart from '@/modules/OrdersChart';
import Stats from '@/modules/Stats';
import TopCategories from '@/modules/TopCategories';
import { signIn, auth } from '../../../../auth';

export default async function Page() {
  const session = await auth();

  return (
    <div className='flex flex-col gap-6'>
      <Stats />
      <BarChart />
      <OrdersChart />
      <TopCategories />
      {session && <LineChart />}
      <form
        action={async () => {
          'use server';
          await signIn('google');
        }}
      >
        <button type='submit'>Sign In</button>
      </form>
    </div>
  );
}
