'use client';
import { useEffect } from 'react';
import { InboxTable } from './ui/InboxTable';
import { useFindManyQuery } from '@/shared/api/feedbackApi';
import classes from './classes.module.css';

export default function AdminInboxDisplay() {
  const { data, isError, isLoading } = useFindManyQuery({
    limit: 1000000,
    page: 0,
  });

  if (isError) return <p>Oops, something went wrong</p>;
  if (isLoading) return <p>Loading...</p>;
  if (!data) return <InboxTable data={[]} />;

  return (
    <>
      <div className={classes.header}>
        <hgroup className={classes.pageHeading}>
          <h2>Inbox</h2>
          <p>Manage user messages and requests</p>
        </hgroup>
      </div>

      <InboxTable data={data.content} />
    </>
  );
}
