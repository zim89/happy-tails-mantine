import Breadcrumbs from '@/components/Breadcrumbs';
import NewOrder from '@/modules/NewOrder';

export default function Page() {
  return (
    <div>
      <div className='mb-8'>
        <Breadcrumbs
          crumbs={[
            { href: '/admin/', text: 'Dashboard' },
            { href: '/admin/orders', text: 'Order' },
            { text: 'Add an order' },
          ]}
        />
      </div>
      <section>
        <hgroup className='mr-auto'>
          <h2 className='mb-2 text-[1.75rem]/[normal] font-bold lg:text-4xl/[normal]'>
            Add an order
          </h2>
          <p>
            Order placement by manager. Fields marked with (*) are mandatory.
          </p>
        </hgroup>
        <NewOrder />
      </section>
    </div>
  );
}
