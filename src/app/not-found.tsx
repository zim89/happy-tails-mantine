import { Metadata } from 'next';

import Layout from '@/shared/lib/layout';
import NotFoundComponent from "@/components/NotFound";

export const metadata: Metadata = {
  title: "Not Found | 404",
  robots: {
    index: false,
  },
};

export default function NotFound() {
  return (
    <Layout>
      <NotFoundComponent />
    </Layout>
  );
}
