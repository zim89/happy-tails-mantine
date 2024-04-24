import Breadcrumbs from '@/components/Breadcrumbs';
import OrderHeader from '@/modules/AdminOrderHeader';
import OrderTable from '@/modules/OrderTable';

export default function Page() {
  return (
    <div>
      <div className='mb-8'>
        <Breadcrumbs
          crumbs={[{ href: '/admin/', text: 'Admin' }, { text: 'Orders' }]}
        />
      </div>
      <section>
        <OrderHeader />
        <OrderTable />
      </section>
    </div>
  );
}
