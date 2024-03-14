'use client';
import { profileMenu } from '../lib/data';
import Link from 'next/link';
import { useCallback, useEffect, useRef, useState, UIEvent } from 'react';

import classes from './style.module.css';

let timeout: number;

export default function SliderMenu() {
  const [isScrolling, setIsScrolling] = useState(false);
  let transform = useRef<HTMLDivElement>(null);

  const handleScroll = useCallback(
    (e: UIEvent<HTMLDivElement>) => {
      if (timeout) {
        clearTimeout(timeout);
      }
      
      timeout = window.setTimeout(() => {
        setIsScrolling(false);
      }, 1000);
    },
    [timeout]
  );

  useEffect(() => {
    return () => {
      window.clearTimeout(timeout);
    };
  }, []);

  return (
    <div
      className='relative h-11 min-w-max overflow-hidden overflow-x-scroll bg-slate-200 md:hidden'
      onScroll={(e) => handleScroll(e)}
    >
      <div
        ref={transform}
        className={`${classes.menu} ${isScrolling ? classes.paused : ''}`}
      >
        {profileMenu.map((item) => (
          <Link
            key={item.id}
            href={item.href}
            className='flex gap-2 items-center whitespace-nowrap bg-slate-200 py-[10px] px-4'
          >
            <item.icon size={20}/>
            <span>{item.label}</span>
          </Link>
        ))}
      </div>
    </div>
  );
}
