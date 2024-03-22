import { UpdatePasswordForm } from '../components/UpdatePasswordForm';

import classes from '../styles.module.css';

export default function UpdatePassword() {
  return (
    <>
      <h1 className={classes.profileHeading}>Update your password</h1>
      <UpdatePasswordForm />
    </>
  );
}
