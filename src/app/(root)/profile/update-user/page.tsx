import { cn } from '@/shared/lib/utils';
import { UpdateUserForm } from '../components/UpdateUserForm';

import classes from "../styles.module.css";

export default function UpdateUser() {
  return (
    <>
      <h1 className={cn(classes.profileHeading, "heading")}>
        Update your details
      </h1>
      <UpdateUserForm />
    </>
  );
}
