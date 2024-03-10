"use client";
import Image from "next/image";
import LinksGroup from '@/modules/LinksGroup';
import { Group } from "@mantine/core";
import { LayoutList } from "lucide-react";

import classes from './AdminSidebar.module.css';
import logo from '@/assets/logo/logo-footer.svg';

const data = [
  {
    label: 'Catalog',
    icon: LayoutList,
    initiallyOpened: true,
    links: [
      { label: 'Category', link: '/admin/catalog/category' },
      { label: 'Products', link: '/admin/catalog/products' },
    ],
  },
  {
    label: 'Orders',
    icon: LayoutList,
    links: [{ label: 'Orders', link: '/admin/orders' }],
  },
];

export default function AdminSidebar() {
  return (
    <nav className={classes.navbar}>
      <div className={classes.navbarMain}>
        <Group className={classes.header} justify='center'>
          <a href='#'>
            <Image
              src={logo.src}
              priority
              width={147}
              height={26}
              alt='Happy Tails'
            />
          </a>
        </Group>
        {data.map((item) => (
          <LinksGroup {...item} key={item.label} />
        ))}
      </div>
    </nav>
  );
}
