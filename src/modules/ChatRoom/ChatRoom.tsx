'use client';

import { mockChat } from './lib';
import { SingleMessage } from './components/SingleMessage';

type Props = {
  id: string;
};

export default function ChatRoom({ id }: Props) {
  const messages = mockChat.filter((msg) => msg.threadId === +id);

  if (!messages) return null;

  return (
    <div className='flex flex-col gap-2'>
      {messages.map((msg) => (
        <SingleMessage {...msg} />
      ))}
    </div>
  );
}
