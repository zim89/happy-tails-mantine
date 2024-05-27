import { ChevronLeft, LogOut } from 'lucide-react';

import classes from './AdminHeader.module.css';
import { User } from '@/shared/types/auth.types';
import Logout from '@/components/Logout';
import BlockLink from "@/modules/BlockLink";
import BlockButton from '@/components/BlockButton';

type Props = {
  user: User;
};
export default function AdminHeader({ user }: Props) {
  return (
    <header className={classes.wrapper}>
      <BlockLink href='/' className={classes.returnLink}>
        <ChevronLeft />
        View your store
      </BlockLink>
      <div className={classes.controls}>
        <div className={classes.avatar}>
          <span className={classes.avatarLogo}>{user.firstName[0].toUpperCase()}</span>
          <span>{user.firstName}</span>
        </div>

        <Logout>
          {(logOut) => (
            <BlockButton
              classNames={{
                root: "flex gap-2 font-bold py-2 px-6 border border-solid rounded border-[#C8C8C8] text-sm items-center"
              }}
              onClick={logOut}
            >
              <LogOut size={20} /> Log Out
            </BlockButton>
          )}
        </Logout>
      </div>
    </header>
  );
}
