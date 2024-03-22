import { OrderTabs } from '../components/OrderTabs';

import classes from '../styles.module.css';

function OrderPage() {
  return (
    <>
      <h1 className={classes.profileHeading}>Order History</h1>
      <OrderTabs />
    </>
  );
}

export default OrderPage;
