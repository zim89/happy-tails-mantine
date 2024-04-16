import { Button } from '@mantine/core';
import { ChevronLeft, LogOut } from 'lucide-react';
import Link from 'next/link';

import classes from './AdminHeader.module.css';
import { User } from '@/shared/types/auth.types';
import Logout from '@/components/Logout';

type Props = {
  user: User;
};
export default function AdminHeader({ user }: Props) {
  return (
    <header className="bg-[#FDFDFD]">
      <Link href='/' className={classes.returnLink}>
        <ChevronLeft />
        View your store
      </Link>
      <div className={classes.controls}>
        <div className={classes.avatar}>
          <span className={classes.avatarLogo}>{user.firstName[0]}</span>
          <span>{user.firstName}</span>
        </div>

        <Logout>
          {(logOut) => (
            <Button
              onClick={logOut}
              leftSection={<LogOut size={14} />}
              variant='default'
            >
              Log Out
            </Button>
          )}
        </Logout>
      </div>
    </header>
  );
}
