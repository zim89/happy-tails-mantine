import { Metadata } from 'next';

import UserAccount from './components/UserAccount';

export const metadata: Metadata = {
  title: 'Happy Tails | Profile Page',
  description: null,
  robots: {
    index: false,
  },
};

export default function ProfilePage() {
  return (
    <>
      <UserAccount />
    </>
  );
}
