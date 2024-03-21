"use client";
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

import { useAuth } from '@/shared/hooks/useAuth';
import classes from './layout.module.css';
import AdminSidebar from '@/modules/AdminSidebar';
import AdminHeader from '@/modules/AdminHeader';

export default function Layout({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const { isAdmin } = useAuth();

  useEffect(() => {
    if (!isAdmin) router.push("/"); 
  }, [isAdmin]);

  if (!isAdmin) return null;  

  return (
    <div className={classes.layoutWrapper}>
      <AdminSidebar />
      <AdminHeader />
      <div className={classes.content}>{children}</div>
    </div>
  );
}