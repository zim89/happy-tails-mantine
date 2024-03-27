"use client";
import Link from 'next/link';

import { profileMenu } from '../lib/data';
import { ArrowLeftFromLine, ArrowRightFromLine } from 'lucide-react';
import { useRef } from 'react';

import classes from './style.module.css';

export default function SliderMenu() {
  const menuRef = useRef<HTMLDivElement>(null);

  const moveForward = () => {
    const target = menuRef.current;
    if (target) {
      target.scrollTo({ left: target.offsetWidth * 2, behavior: "smooth" });
    } 
  }

  const moveBackward = () => {
    if (menuRef.current) {
      const target = menuRef.current;

      target.scrollTo({ left: 0, behavior: "smooth" });
    } 
  }

  return (
    <div
      className='lg:hidden overflow-hidden relative'
    >
      <div
        className={classes.menu}
        ref={menuRef}
      >
        <span className="flex items-center p-2 cursor-pointer" onClick={moveForward}><ArrowRightFromLine size={15}/></span>
        {profileMenu.map(item => (
          <Link
            key={item.id}
            href={item.href}
            className='flex gap-2 items-center whitespace-nowrap py-[10px] px-4'
          >
            <item.icon size={20}/>
            <span>{item.label}</span>
          </Link>
        ))}
        <span className="flex items-center p-2 cursor-pointer" onClick={moveBackward}><ArrowLeftFromLine size={15}/></span>
      </div>
    </div>
  );
}
