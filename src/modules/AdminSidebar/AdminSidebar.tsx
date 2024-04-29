"use client";
import Image from "next/image";
import LinksGroup from '@/modules/LinksGroup';
import { Group } from "@mantine/core";
import { LayoutList, SearchCheck, FileText, UsersRound } from "lucide-react";

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
    icon: FileText,
    links: [{ label: 'Orders', link: '/admin/orders' }],
  },
  {
    label: 'Seo',
    icon: SearchCheck,
    links: [{ label: 'Seo', link: '/admin/auth' }]
  },
  {
    label: 'Users',
    icon: UsersRound,
    links: [{ label: "Users", link: '/admin/users' }]
  }
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
