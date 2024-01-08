import React from 'react';
import AdditionalInfo from '@/modules/Product/ui/AdditionalInfo';

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      {children}
      <AdditionalInfo />
    </>
  );
}
