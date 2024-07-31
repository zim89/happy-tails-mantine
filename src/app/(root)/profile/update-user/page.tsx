import { cn } from '@/shared/lib/utils';
import { UpdateUserForm } from '../components/UpdateUserForm';

import classes from '../styles.module.css';

export default function UpdateUser() {
  return (
    <div className={classes.box}>
      <h1 className={cn(classes.boxHeading, 'mb-8 hidden lg:block')}>
        Update your details
      </h1>
      <UpdateUserForm />
    </div>
  );
}
