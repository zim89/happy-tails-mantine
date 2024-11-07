import Breadcrumbs from '@/components/Breadcrumbs/Breadcrumbs';
import ChatRoom from '@/modules/ChatRoom';

type Props = {
  params: { id: string };
  searchParams: { fromPage: string };
};

export default function Page({ params, searchParams }: Props) {
  return (
    <>
      <Breadcrumbs
        crumbs={[
          { text: 'Dashboard', href: '/admin/' },
          {
            text: 'Inbox',
            href: `/admin/inbox?page=${searchParams.fromPage || 1}`,
          },
          { text: 'Chat' },
        ]}
        classNames={{
          root: 'p-0 m-0 mb-8',
        }}
      />
      <ChatRoom id={params.id} />
    </>
  );
}
