'use client';

import { profileMenu } from "@/modules/Header/lib/data";
import Link from "next/link";
import { useCallback, useEffect, useRef, useState, UIEvent } from "react";

import classes from "./style.module.css";

let lastScrollLeft = 0;
let direction = 1;

export default function SliderMenu() {
    const [isScrolling, setIsScrolling] = useState(false);
    let timeout = useRef<number>(null);
    let transform = useRef<HTMLDivElement>(null);

    const handleScroll = useCallback((e: UIEvent<HTMLDivElement>) => {
      if (timeout.current) {
        clearTimeout(timeout.current);
      }
      
      if (e.currentTarget.scrollLeft > lastScrollLeft) {
        direction = 1;
      } else {
        direction = -1;
      }

      lastScrollLeft = e.currentTarget.scrollLeft;

      setIsScrolling(true);
  
      timeout.current = setTimeout(() => {
        setIsScrolling(false);
      }, 1000);
    }, [timeout.current])
    

    useEffect(() => {
      return () => {
        if (timeout.current) {
          clearTimeout(timeout.current);
        }
      }
    }, []);

    return (

        <div className='relative custom-scroll sm: overflow-hidden overflow-x-scroll min-w-max h-16 bg-slate-200 md:hidden' onScroll={(e) => handleScroll(e)}>
        <div ref={transform} className={`${classes.menu} ${isScrolling ? classes.paused : ''}`}>
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
    )
}