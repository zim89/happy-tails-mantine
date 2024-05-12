import { Metadata } from 'next';

import AdminDashboard from "@/modules/AdminDashboard";

export const metadata: Metadata = {
  robots: {
      index: false
  }
}

export default function Page() {
  return (
    <AdminDashboard />
  );
}