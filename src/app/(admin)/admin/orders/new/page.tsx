import Breadcrumbs from '@/components/Breadcrumbs';
import NewOrder from '@/modules/NewOrder';

export default function Page() {
  return (
    <>
      <Breadcrumbs
        crumbs={[
          { href: '/admin/', text: 'Dashboard' },
          { href: '/admin/orders', text: 'Orders' },
          { text: 'Add an order' },
        ]}
        classNames={{
          root: 'p-0 m-0 mb-8',
        }}
      />

      <section>
        <hgroup className='mr-auto'>
          <h2 className='mb-1 text-[2rem]/[2.4rem] font-bold'>Add an order</h2>
          <p>
            Order placement by manager. Fields marked with (*) are mandatory.
          </p>
        </hgroup>
        <NewOrder />
      </section>
    </>
  );
}
