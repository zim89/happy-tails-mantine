export const navLinks = [
  {
    label: 'All products',
    href: '/products',
  },
  {
    label: 'Clothing',
    href: '/clothing',
  },
  {
    label: 'Leads&Harnesses',
    href: '/leads&harnesses',
  },
  {
    label: 'Toys',
    href: '/toys',
  },
  {
    label: 'Care',
    href: '/care',
  },
  {
    label: 'Furniture',
    href: '/furniture',
  },
  {
    label: 'Collars',
    href: '/collars',
  },
] as const;

export const footerLinks = [
  {
    title: 'CONTACTS',
    link: '/contacts',
    isLast: false,
  },
  {
    title: 'DELIVERY & RETURNS',
    link: '/delivery&returns',
    isLast: false,
  },
  {
    title: 'BLOG',
    link: '/blog',
    isLast: true,
  },
] as const;