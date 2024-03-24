import collarsIcon from '@/assets/icons/categories/collars.svg';
import careIcon from '@/assets/icons/categories/care.svg';
import toysIcon from '@/assets/icons/categories/toys.svg';
import clothingIcon from '@/assets/icons/categories/clothing.svg';
import productsIcon from '@/assets/icons/categories/products.svg';
import leadsIcon from '@/assets/icons/categories/leads.svg';
import furnitureIcon from '@/assets/icons/categories/furniture.svg';

export const categoryLinks = [
  {
    label: 'Care',
    short: 'Care',
    href: '/care',
    icon: careIcon,
  },
  {
    label: 'Collars',
    short: 'Collars',
    href: '/collars',
    icon: "https://i.imgur.com/xxfcU4d.png",
  },
  {
    label: 'Toys',
    short: 'Toys',
    href: '/toys',
    icon: toysIcon,
  },
  {
    label: 'Clothing',
    short: 'Clothing',
    href: '/clothing',
    icon: clothingIcon,
  },
  {
    label: 'All products',
    short: 'All products',
    href: '/products',
    icon: productsIcon,
  },
  {
    label: 'Leads&harnesses',
    short: 'Leads',
    href: '/leads&harnesses',
    icon: leadsIcon,
  },
  {
    label: 'Furniture',
    short: 'Furniture',
    href: '/furniture',
    icon: furnitureIcon,
  },
] as const;

export const additionalLinks = [
  {
    label: 'Contacts',
    href: '/contacts',
  },
  {
    label: 'Delivery & Returns',
    href: '/delivery&returns',
  },
  {
    label: 'Blog',
    href: '/blog',
  }
] as const;
