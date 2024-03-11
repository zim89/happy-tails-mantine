'use client';

import { profileMenu } from '@/modules/Header/lib/data';
import Link from 'next/link';
import { useCallback, useEffect, useRef, useState, UIEvent } from 'react';

import classes from './style.module.css';

let lastScrollLeft = 0;
let direction = 1;
let timeout: number;

export default function SliderMenu() {
  const [isScrolling, setIsScrolling] = useState(false);
  let transform = useRef<HTMLDivElement>(null);

  const handleScroll = useCallback(
    (e: UIEvent<HTMLDivElement>) => {
      if (timeout) {
        clearTimeout(timeout);
      }

      if (e.currentTarget.scrollLeft > lastScrollLeft) {
        direction = 1;
      } else {
        direction = -1;
      }

      lastScrollLeft = e.currentTarget.scrollLeft;

      setIsScrolling(true);

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
      className='custom-scroll sm: relative h-16 min-w-max overflow-hidden overflow-x-scroll bg-slate-200 md:hidden'
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
            className='flex gap-2 whitespace-nowrap bg-slate-200 p-4'
          >
            <item.icon />
            <span>{item.label}</span>
          </Link>
        ))}
      </div>
    </div>
  );
}
