import { cn } from '@/shared/lib/utils';
import { UpdatePasswordForm } from '../components/UpdatePasswordForm';

import classes from '../styles.module.css';

export default function UpdatePassword() {
  return (
    <>
      <h1 className={cn(classes.profileHeading, "heading")}>Update your password</h1>
      <UpdatePasswordForm />
    </>
  );
}
