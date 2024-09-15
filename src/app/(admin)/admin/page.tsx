import BarChart from '@/modules/BarChart';
import LineChart from '@/modules/LineChart';
import OrdersChart from '@/modules/OrdersChart';
import Stats from '@/modules/Stats';
import TopCategories from '@/modules/TopCategories';
import { auth } from '../../../../auth';

export default async function Page() {
  const session = await auth();

  return (
    <div className='flex flex-col gap-6'>
      <Stats />
      <BarChart />
      <OrdersChart />
      <TopCategories />
      {session && <LineChart />}
    </div>
  );
}
