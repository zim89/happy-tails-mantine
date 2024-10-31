import { Metadata } from 'next';

import Breadcrumbs from '@/components/Breadcrumbs/Breadcrumbs';
import OrderTable from '@/modules/OrderTable';
import classes from './styles.module.css';

export const metadata: Metadata = {
  robots: {
    index: false,
  },
};

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
        <OrderTable />
      </section>
    </>
  );
}
