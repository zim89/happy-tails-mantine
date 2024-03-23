import { cn } from '@/shared/lib/utils';
import { OrderTabs } from '../components/OrderTabs';

import classes from '../styles.module.css';

function OrderPage() {
  return (
    <>
      <h1 className={cn(classes.profileHeading, "heading")}>Order History</h1>
      <OrderTabs />
    </>
  );
}

export default OrderPage;
