import { Metadata } from 'next';

import AdminInboxDisplay from '@/modules/AdminInboxDisplay';

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
      <AdminInboxDisplay />
    </>
  );
}
