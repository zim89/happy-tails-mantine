import BarChart from '@/modules/BarChart';
import Analitycs from '@/modules/LineChart/LineChart';
import OrdersChart from '@/modules/OrdersChart';
import Stats from '@/modules/Stats';
import TopCategories from '@/modules/TopCategories';

export default function Page() {
  return (
    <div className='flex flex-col gap-6'>
      <Stats />
      <BarChart />
      <OrdersChart />
      <TopCategories />
      <Analitycs />
    </div>
  );
}
