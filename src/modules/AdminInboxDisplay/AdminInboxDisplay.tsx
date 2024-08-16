import Breadcrumbs from '@/components/Breadcrumbs/Breadcrumbs';

import classes from './classes.module.css';
import { Table } from './components/Table';
import { messages } from './lib/mock';

export default function AdminInboxDisplay() {
  return (
    <>
      <Breadcrumbs
        crumbs={[{ text: 'Dashboard', href: '/admin/' }, { text: 'Inbox' }]}
        classNames={{
          root: 'p-0 m-0 mb-8',
        }}
      />
      <div className={classes.header}>
        <hgroup className={classes.pageHeading}>
          <h2>Inbox</h2>
          <p>Manage user messages and requests</p>
        </hgroup>
      </div>
      <Table data={messages} />
    </>
  );
}
