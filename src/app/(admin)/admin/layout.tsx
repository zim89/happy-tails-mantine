'use client';

import { notFound, usePathname } from 'next/navigation';

import { useAuth } from '@/shared/hooks/useAuth';
import classes from './layout.module.css';
import AdminSidebar from '@/modules/AdminSidebar';
import AdminHeader from '@/modules/AdminHeader';
import { UnsavedChangesProvider } from '@/shared/context/unsaved.context';
import { AdminPanelProvider } from '@/shared/context/panel.context';
import { notifyContext } from '@/shared/context/notification.context';
import { useContext, useEffect } from 'react';
import { AlertTriangle, Check } from 'lucide-react';
import Notify from '@/components/Notify';

const regex = /\/preview/;

export default function Layout({ children }: { children: React.ReactNode }) {
  const { isAdmin, currentUser } = useAuth();
  const path = usePathname();
  const { props, clear, setParams } = useContext(notifyContext);

  useEffect(() => {
    setParams &&
      setParams({
        failed: {
          icon: <AlertTriangle size={24} fill='#DC362E' />,
          text: 'Operation has completed!',
          classNames: {
            icon: 'bg-transparent',
            closeButton: 'text-black',
            description: 'text-red-500',
            progress: 'bg-red-500',
          },
        },
        success: {
          icon: <Check size={24} className='text-green-500' />,
          text: 'Operation has failed!',
          classNames: {
            icon: 'bg-transparent',
            closeButton: 'text-black',
            description: 'text-green-500',
            progress: 'bg-green-500',
          },
        },
      });
  }, [setParams]);

  if (!isAdmin || !currentUser) notFound();

  const isPreviewed = regex.test(path);

  return (
    <AdminPanelProvider>
      <UnsavedChangesProvider>
        {!isPreviewed ? (
          <div className={classes.layoutWrapper}>
            <AdminSidebar />
            <AdminHeader user={currentUser} />
            <div className={classes.content}>{children}</div>
          </div>
        ) : (
          <div>{children}</div>
        )}
        <Notify {...props} onClose={clear} />
      </UnsavedChangesProvider>
    </AdminPanelProvider>
  );
}
