import Breadcrumbs from '@/components/Breadcrumbs/Breadcrumbs';
import ChatRoom from '@/modules/ChatRoom';

type Props = {
  params: { id: string };
};
export default function Page({ params }: Props) {
  return (
    <>
      <Breadcrumbs
        crumbs={[
          { text: 'Dashboard', href: '/admin/' },
          { text: 'Inbox', href: '/admin/inbox' },
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
