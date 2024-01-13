import Link from 'next/link';
import { footerLinks } from '../lib/data';

export default function FooterNav() {
  return (
    <ul className='my-6 flex gap-3 border-y border-y-brand-grey-900 py-6 md:my-9 md:gap-7'>
      {footerLinks.map((link) => (
        <li
          key={link.label}
          className='relative after:absolute after:-right-2 after:top-1/2 after:h-1 after:w-1 after:-translate-y-0.5 after:rounded-full after:bg-primary last:after:hidden md:after:-right-4'
        >
          <Link
            href={link.href}
            className='navLinkFooter md:text-xl md:leading-normal'
          >
            {link.label}
          </Link>
        </li>
      ))}
    </ul>
  );
}
