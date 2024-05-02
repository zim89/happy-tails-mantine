import { LayoutList, SearchCheck, FileText, UsersRound, LucideIcon } from 'lucide-react';

type SharedLinkProps = {
  label: string;
  icon: LucideIcon;
  initiallyOpened?: true;
};

export type SingleLink = {
  id: 'link';
  link: string;
} & SharedLinkProps;

export type LinksGroup = {
  id: 'links-group';
  links: { label: string; link: string }[];
} & SharedLinkProps;

export type SidebarLinks = (LinksGroup | SingleLink)[];

export const links: SidebarLinks = [
  {
    id: 'link',
    label: 'Dashboard',
    icon: LayoutList,
    initiallyOpened: true,
    link: '/admin/',
  },
  {
    id: 'links-group',
    label: 'Catalog',
    icon: LayoutList,
    links: [
      { label: 'Categories', link: '/admin/categories' },
      { label: 'Products', link: '/admin/products' },
    ],
  },
  {
    id: 'link',
    label: 'Orders',
    icon: FileText,
    link: '/admin/orders',
  },
//   {
//     id: 'link',
//     label: 'Seo',
//     icon: SearchCheck,
//     link: '/admin/auth',
//   },
  {
    id: 'link',
    label: 'Users',
    icon: UsersRound,
    link: '/admin/users',
  },
] as const;