import { Metadata } from 'next';

import Logout from "./components/Logout";

export const metadata: Metadata = {
  title: 'Happy Tails | Profile Page',
  description: null,
  robots: {
    index: false,
  },
};

export default function ProfilePage() {
  return (
    <div className='mx-auto flex flex-col md:max-w-[572px]'>
      <hgroup className='text-center'>
        <h1 className='heading'>My Personal Account</h1>
        <p className='py-4 font-light'>
          Hello Diana, welcome to your Happy Tails account. Here you can manage
          your details, repeat orders and view your order history.
        </p>
      </hgroup>
      <Logout />
    </div>
  );
}
