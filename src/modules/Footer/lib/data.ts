import { Facebook, Instagram, Youtube } from 'lucide-react';
import React from 'react';

export const footerLinks = [
  { label: 'Contacts', href: '/contacts' },
  { label: 'Delivery & Returns', href: '/delivery&returns' },
  { label: 'Blog', href: '/blog' },
] as const;

export const footerSocialLinks = [
  {
    label: 'facebook',
    icon: React.createElement(Facebook),
    ariaLabel: 'Go to Facebook',
    href: 'https://www.facebook.com/',
  },
  {
    label: 'youtube',
    icon: React.createElement(Youtube),
    ariaLabel: 'Go to YouTube',
    href: 'https://www.youtube.com/',
  },
  {
    label: 'tiktok',
    icon: '',
    ariaLabel: 'Go to Tiktok',
    href: 'https://www.tiktok.com/',
  },
  {
    label: 'instagram',
    icon: React.createElement(Instagram),
    ariaLabel: 'Go to Instagram',
    href: 'https://www.instagram.com/',
  },
] as const;
