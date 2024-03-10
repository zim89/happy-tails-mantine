import { Metadata } from 'next';

import classes from './layout.module.css';
import AdminSidebar from '@/modules/AdminSidebar';
import AdminHeader from '@/modules/AdminHeader';

export const metadata: Metadata = {
  robots: {
      index: false
  }
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className={classes.layoutWrapper}>
      <AdminSidebar />
      <AdminHeader />
      <div className={classes.content}>{children}</div>
    </div>
  );
}