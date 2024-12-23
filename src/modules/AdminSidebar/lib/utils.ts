import {
  LayoutList,
  LayoutDashboard,
  FileText,
  UsersRound,
  Newspaper,
  LucideIcon,
  MessagesSquare,
  Settings2,
} from 'lucide-react';

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
    icon: LayoutDashboard,
    initiallyOpened: true,
    link: '/admin',
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
  {
    id: 'link',
    label: 'Users',
    icon: UsersRound,
    link: '/admin/users',
  },
  {
    id: 'link',
    label: 'Messages',
    icon: MessagesSquare,
    link: '/admin/inbox',
  },
  {
    id: 'link',
    label: 'Blogs',
    icon: Newspaper,
    link: '/admin/blogs',
  },
  {
    id: 'links-group',
    label: 'Settings',
    icon: Settings2,
    links: [
      { label: 'Main Page', link: '/admin/settings#homePage' },
      { label: 'Delivery', link: '/admin/settings#delivery' },
      { label: 'Promo Code', link: '/admin/settings#promo' },
      { label: 'Tax', link: '/admin/settings#tax' },
      { label: 'Profile', link: '/admin/settings#profile' },
    ],
  },
] as const;
