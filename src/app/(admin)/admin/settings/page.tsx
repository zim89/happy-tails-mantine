import Breadcrumbs from '@/components/Breadcrumbs';
import PageHeader from '@/components/PageHeader';
import { SettingsDisplay } from '@/modules/SettingsDisplay';

export default function SettingsPage() {
  return (
    <>
      <div className='mb-8'>
        <Breadcrumbs
          crumbs={[
            { href: '/admin/', text: 'Dashboard' },
            { text: 'Settings' },
          ]}
          classNames={{
            root: 'p-0 m-0',
          }}
        />
      </div>
      <PageHeader>
        {(Group) => (
          <>
            <Group
              title='Settings'
              additional='Manage main page, delivery and promocode settings '
            />
          </>
        )}
      </PageHeader>
      <SettingsDisplay />
    </>
  );
}
