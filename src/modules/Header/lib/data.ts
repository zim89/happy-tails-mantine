import collarsIcon from '@/assets/icons/categories/collars.svg';
import careIcon from '@/assets/icons/categories/care.svg';
import toysIcon from '@/assets/icons/categories/toys.svg';
import clothingIcon from '@/assets/icons/categories/clothing.svg';
import productsIcon from '@/assets/icons/categories/products.svg';
import leadsIcon from '@/assets/icons/categories/leads.svg';
import furnitureIcon from '@/assets/icons/categories/furniture.svg';

// Profile icons
import { User2, Truck, LockKeyhole, FileText, BookUser } from "lucide-react";

export const profileMenu = [
  { id: 0, label: "My account", href: "/my-account", icon: User2 },
  { id: 1, label: "Order history", href: "/profile/order", icon: FileText },
  { id: 2, label: "Update your details", href: "/update-profile", icon: BookUser },
  { id: 3, label: "Update your password", href: "/change-password", icon: LockKeyhole },
  { id: 4, label: "Delivery addresses", href: "/devivery", icon: Truck },
]

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
    icon: collarsIcon,
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
    label: 'Log in',
    href: '/auth',
  },
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
