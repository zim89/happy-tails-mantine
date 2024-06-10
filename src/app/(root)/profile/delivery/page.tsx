import { DeliveryForm } from '../components/DeliveryForm';

import classes from '../styles.module.css';

export default function DeliveryPage() {
  return (
    <div className={classes.box}>
      <hgroup className='text-center'>
        <h1 className={classes.boxHeading}>Delivery address</h1>
        <p className='py-4 font-light'>
          * Required fields are marked with an asterisk <br />
          Please enter your delivery address
        </p>
      </hgroup>
      <DeliveryForm />
    </div>
  );
}
