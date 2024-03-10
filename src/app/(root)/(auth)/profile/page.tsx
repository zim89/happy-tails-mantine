import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Happy Tails | Profile',
  description: null,
  robots: {
    index: false
  }
};

export default async function Page() {
  return (
    <div>
      <h1>Profile of </h1>
    </div>
  );
}
