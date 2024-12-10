'use client';

import Link from 'next/link';
import { useRef } from 'react';

import { profileMenu } from '../lib/data';
import { ArrowLeftFromLine, ArrowRightFromLine } from 'lucide-react';

import classes from './style.module.css';

export default function SliderMenu() {
  const menuRef = useRef<HTMLDivElement>(null);

  const moveForward = () => {
    const target = menuRef.current;
    if (target) {
      target.scrollTo({ left: target.offsetWidth * 2, behavior: 'smooth' });
    }
  };

  const moveBackward = () => {
    if (menuRef.current) {
      const target = menuRef.current;

      target.scrollTo({ left: 0, behavior: 'smooth' });
    }
  };

  return (
    <div className='relative overflow-hidden lg:hidden'>
      <div className={classes.menu} ref={menuRef}>
        <span
          className='flex cursor-pointer items-center p-2'
          onClick={moveForward}
        >
          <ArrowRightFromLine size={15} />
        </span>
        {profileMenu.map((item) => (
          <Link
            key={item.id}
            href={item.href}
            className='flex items-center gap-2 whitespace-nowrap px-4 py-[10px]'
          >
            <item.icon size={20} />
            <span>{item.label}</span>
          </Link>
        ))}
        <span
          className='flex cursor-pointer items-center p-2'
          onClick={moveBackward}
        >
          <ArrowLeftFromLine size={15} />
        </span>
      </div>
    </div>
  );
}
