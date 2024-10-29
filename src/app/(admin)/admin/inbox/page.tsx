import { Metadata } from 'next';

import AdminInboxDisplay from '@/modules/AdminInboxDisplay';
import Breadcrumbs from '@/components/Breadcrumbs';

export const generateMetadata = (): Metadata => {
  // TODO: Track incoming messages
  const newMessages = 4;

  return {
    title: `Inbox (${newMessages})`,
    robots: {
      index: false,
    },
  };
};

export default function Page() {
  return (
    <>
      <Breadcrumbs
        crumbs={[{ text: 'Dashboard', href: '/admin/' }, { text: 'Inbox' }]}
        classNames={{
          root: 'p-0 m-0 mb-8',
        }}
      />
      <AdminInboxDisplay />
    </>
  );
}
