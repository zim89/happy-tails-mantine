import { UpdateUserForm } from '../components/UpdateUserForm';

import classes from "../styles.module.css";

export default function UpdateUser() {
  return (
    <>
      <h1 className={classes.profileHeading}>
        Update your details
      </h1>
      <UpdateUserForm />
    </>
  );
}
