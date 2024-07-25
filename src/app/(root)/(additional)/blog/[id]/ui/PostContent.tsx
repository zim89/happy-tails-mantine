'use client';

import DOMPurify from 'dompurify';

import classes from '../classes.module.css';
import { cn } from '@/shared/lib/utils';

type Props = {
  content: string;
  className?: string;
};

export const PostContent = ({ content, className }: Props) => {
  const sanitizedData = DOMPurify.sanitize(content, {
    USE_PROFILES: { html: true },
  });

  return (
    <div
      className={cn(classes.content, className)}
      dangerouslySetInnerHTML={{ __html: sanitizedData }}
    />
  );
};
