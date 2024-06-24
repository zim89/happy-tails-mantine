import Breadcrumbs from '@/components/Breadcrumbs';
import OrderHeader from '@/modules/AdminOrderHeader';
import OrderTable from '@/modules/OrderTable';
import classes from './styles.module.css';

export default function Page() {
  return (
    <>
      <div className={classes.breadCrumbs}>
        <Breadcrumbs
          crumbs={[{ href: '/admin/', text: 'Dashboard' }, { text: 'Orders' }]}
          classNames={{
            root: 'p-0 m-0',
          }}
        />
      </div>
      <section>
        <OrderHeader />
        <OrderTable />
      </section>
    </>
  );
}
