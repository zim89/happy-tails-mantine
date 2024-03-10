import { Button } from "@mantine/core";
import { ChevronLeft, LogOut } from "lucide-react";
import Link from "next/link";

import classes from "./AdminHeader.module.css";

export default function AdminHeader() {
  return (
    <header>
      <Link href='/' className={classes.returnLink}>
        <ChevronLeft />
        View your store
      </Link>
      <div className={classes.controls}>
        <div className={classes.avatar}>
          <span className={classes.avatarLogo}>
            A
          </span>
          <span>Admin</span>
        </div>
        <Button leftSection={<LogOut size={14} />} variant='default'>
          Log Out
        </Button>
      </div>
    </header>
  );
}
