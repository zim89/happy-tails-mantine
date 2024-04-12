"use client";
import { notFound } from 'next/navigation';

import { useAuth } from '@/shared/hooks/useAuth';
import classes from './layout.module.css';
import AdminSidebar from '@/modules/AdminSidebar';
import AdminHeader from '@/modules/AdminHeader';

export default function Layout({ children }: { children: React.ReactNode }) {
  const { isAdmin } = useAuth();

  if (!isAdmin) return notFound();  

  return (
    <div className={classes.layoutWrapper}>
      <AdminSidebar />
      <AdminHeader />
      <div className={classes.content}>{children}</div>
    </div>
  );
}