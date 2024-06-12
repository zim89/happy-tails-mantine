'use client';

import { mockChat } from './lib';
import { SingleMessage } from './components/SingleMessage';
import { ReplyMessage } from './components/ReplyMessage';
import { notFound } from 'next/navigation';

type Props = {
  id: string;
};

export default function ChatRoom({ id }: Props) {
  const messages = mockChat.filter((msg) => msg.threadId === +id);

  if (!messages) return notFound();

  return (
    <>
      <div className='flex flex-col gap-2'>
        {messages.map((msg) => (
          <SingleMessage key={msg.id} {...msg} />
        ))}
      </div>
      <ReplyMessage threadId={+id} />
    </>
  );
}
