'use client';

import DOMPurify from 'dompurify';

import classes from '../classes.module.css';

type Props = {
  content: string;
};

export const PostContent = ({ content }: Props) => {
  const sanitizedData = DOMPurify.sanitize(content, {
    USE_PROFILES: { html: true },
  });

  return (
    <div
      className={classes.content}
      dangerouslySetInnerHTML={{ __html: sanitizedData }}
    />
  );
};
