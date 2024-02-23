import React from 'react';
import ProductAdditionalInfo from '@/components/ProductAdditionalInfo';

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      {children}
      <ProductAdditionalInfo />
    </>
  );
}
