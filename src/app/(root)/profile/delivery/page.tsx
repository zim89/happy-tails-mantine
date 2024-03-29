import { cn } from "@/shared/lib/utils";
import { DeliveryForm } from "../components/DeliveryForm";

import classes from "../styles.module.css";

export default function DeliveryPage() {
  return (
    <>
      <hgroup className='text-center'>
        <h1 className={cn(classes.profileHeading, "heading")}>Delivery address</h1>
        <p className='py-4 font-light'>
          * Required fields are marked with an asterisk <br />
          Please enter your delivery address
        </p>
      </hgroup>
      <DeliveryForm />
    </>
  );
}
