import { Button } from '@mantine/core';
import { ChevronLeft, LogOut } from 'lucide-react';
import Link from 'next/link';

import { useAuth } from "@/shared/hooks/useAuth";
import classes from './AdminHeader.module.css';
import Logout from '@/components/Logout';
import { useRouter } from 'next/navigation';

export default function AdminHeader() {
  const router = useRouter();
  const { currentUser } = useAuth();

  if (!currentUser) return router.replace("/403");

  return (
    <header>
      <Link href='/' className={classes.returnLink}>
        <ChevronLeft />
        View your store
      </Link>
      <div className={classes.controls}>
        <div className={classes.avatar}>
          <span className={classes.avatarLogo}>{currentUser.firstName[0]}</span>
          <span>{currentUser.firstName}</span>
        </div>
        <Logout>
          {(handleLogout) => (
            <Button onClick={handleLogout} leftSection={<LogOut size={14} />} variant='default'>
              Log Out
            </Button>
          )}
        </Logout>
      </div>
    </header>
  );
}
