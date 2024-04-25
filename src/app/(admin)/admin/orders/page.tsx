import Breadcrumbs from '@/components/Breadcrumbs';
import OrderHeader from '@/modules/AdminOrderHeader';
import OrderTable from '@/modules/OrderTable';
import classes from "./styles.module.css";

export default function Page() {
  return (
    <div>
      <div className={classes.breadCrumbs}>
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
