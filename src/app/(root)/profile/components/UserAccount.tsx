"use client";
import classes from "../styles.module.css";
import { useAuth } from '@/shared/hooks/useAuth';
import Logout from "@/components/Logout";

export default function UserAccount() {
    const { currentUser } = useAuth();
    if (!currentUser) return null;

    return (
        <div className={classes.profileContent}>
        <hgroup>
          <h1 className={classes.profileHeading}>My Personal Account</h1>
          <p className={classes.profileParagraph}>
            Hello {currentUser.firstName}, welcome to your Happy Tails account. Here you can manage
            your details, repeat orders and view your order history.
          </p>
        </hgroup>
        <Logout />
      </div>
    )
}