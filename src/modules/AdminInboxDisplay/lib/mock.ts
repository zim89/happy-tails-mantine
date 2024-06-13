import { mockChat } from '@/modules/ChatRoom/lib';

type MessageStatus = 'read' | 'unread';

export type Message = {
  id: number;
  threadId: number;
  starred: boolean;
  sender: string;
  title: string;
  status: MessageStatus;
  sentAt: string;
  message: string;
};

export const messages: Message[] = [
  {
    id: 1,
    threadId: 1,
    starred: true,
    title:
      'Exercitationem perspiciatis et excepturi quo error culpa minima veniam. Exercitationem perspiciatis et excepturi quo error culpa minima veniam.',
    sender: 'Susan Champlin',
    status: 'read',
    sentAt: Date.now().toString(),
    message: 'cmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmm',
  },
  {
    id: 2,
    threadId: 2,
    starred: false,
    title:
      'Exercitationem perspiciatis et excepturi quo error culpa minima veniam. Exercitationem perspiciatis et excepturi quo error culpa minima veniam.',
    sender: 'Kari Hermiston',
    status: 'unread',
    sentAt: Date.now().toString(),
    message: 'duhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhh',
  },
  {
    id: 3,
    threadId: 2,
    starred: false,
    title:
      'Exercitationem perspiciatis et excepturi quo error culpa minima veniam. Exercitationem perspiciatis et excepturi quo error culpa minima veniam.',
    sender: 'Kari Hermiston',
    status: 'unread',
    sentAt: Date.now().toString(),
    message: 'duhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhh',
  },
  {
    id: 4,
    threadId: 2,
    starred: false,
    title:
      'Exercitationem perspiciatis et excepturi quo error culpa minima veniam. Exercitationem perspiciatis et excepturi quo error culpa minima veniam.',
    sender: 'Kari Hermiston',
    status: 'unread',
    sentAt: Date.now().toString(),
    message: 'duhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhh',
  },
  {
    id: 5,
    threadId: 2,
    starred: false,
    title:
      'Exercitationem perspiciatis et excepturi quo error culpa minima veniam. Exercitationem perspiciatis et excepturi quo error culpa minima veniam.',
    sender: 'Kari Hermiston',
    status: 'unread',
    sentAt: Date.now().toString(),
    message: 'duhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhh',
  },
  {
    id: 6,
    threadId: 2,
    starred: false,
    title:
      'Exercitationem perspiciatis et excepturi quo error culpa minima veniam. Exercitationem perspiciatis et excepturi quo error culpa minima veniam.',
    sender: 'Kari Hermiston',
    status: 'unread',
    sentAt: Date.now().toString(),
    message: 'duhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhh',
  },
  {
    id: 7,
    threadId: 2,
    starred: false,
    title:
      'Exercitationem perspiciatis et excepturi quo error culpa minima veniam. Exercitationem perspiciatis et excepturi quo error culpa minima veniam.',
    sender: 'Kari Hermiston',
    status: 'unread',
    sentAt: Date.now().toString(),
    message: 'duhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhh',
  },
  {
    id: 8,
    threadId: 2,
    starred: false,
    title:
      'Exercitationem perspiciatis et excepturi quo error culpa minima veniam. Exercitationem perspiciatis et excepturi quo error culpa minima veniam.',
    sender: 'Kari Hermiston',
    status: 'unread',
    sentAt: Date.now().toString(),
    message: 'duhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhh',
  },
  {
    id: 9,
    threadId: 2,
    starred: false,
    title:
      'Exercitationem perspiciatis et excepturi quo error culpa minima veniam. Exercitationem perspiciatis et excepturi quo error culpa minima veniam.',
    sender: 'Kari Hermiston',
    status: 'unread',
    sentAt: Date.now().toString(),
    message: 'duhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhh',
  },
  {
    id: 10,
    threadId: 2,
    starred: false,
    title:
      'Exercitationem perspiciatis et excepturi quo error culpa minima veniam. Exercitationem perspiciatis et excepturi quo error culpa minima veniam.',
    sender: 'Kari Hermiston',
    status: 'unread',
    sentAt: Date.now().toString(),
    message: 'duhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhh',
  },
  {
    id: 11,
    threadId: 2,
    starred: false,
    title:
      'Exercitationem perspiciatis et excepturi quo error culpa minima veniam. Exercitationem perspiciatis et excepturi quo error culpa minima veniam.',
    sender: 'Kari Hermiston',
    status: 'unread',
    sentAt: Date.now().toString(),
    message: 'duhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhh',
  },
  {
    id: 12,
    threadId: 2,
    starred: false,
    title:
      'Exercitationem perspiciatis et excepturi quo error culpa minima veniam. Exercitationem perspiciatis et excepturi quo error culpa minima veniam.',
    sender: 'Kari Hermiston',
    status: 'unread',
    sentAt: Date.now().toString(),
    message: 'duhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhh',
  },
  {
    id: 13,
    threadId: 2,
    starred: false,
    title:
      'Exercitationem perspiciatis et excepturi quo error culpa minima veniam. Exercitationem perspiciatis et excepturi quo error culpa minima veniam.',
    sender: 'Kari Hermiston',
    status: 'unread',
    sentAt: Date.now().toString(),
    message: 'duhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhh',
  },
  {
    id: 14,
    threadId: 2,
    starred: false,
    title:
      'Exercitationem perspiciatis et excepturi quo error culpa minima veniam. Exercitationem perspiciatis et excepturi quo error culpa minima veniam.',
    sender: 'Kari Hermiston',
    status: 'unread',
    sentAt: Date.now().toString(),
    message: 'duhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhh',
  },
  {
    id: 15,
    threadId: 2,
    starred: false,
    title:
      'Exercitationem perspiciatis et excepturi quo error culpa minima veniam. Exercitationem perspiciatis et excepturi quo error culpa minima veniam.',
    sender: 'Kari Hermiston',
    status: 'unread',
    sentAt: Date.now().toString(),
    message: 'duhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhh',
  },
  {
    id: 16,
    threadId: 2,
    starred: false,
    title:
      'Exercitationem perspiciatis et excepturi quo error culpa minima veniam. Exercitationem perspiciatis et excepturi quo error culpa minima veniam.',
    sender: 'Kari Hermiston',
    status: 'unread',
    sentAt: Date.now().toString(),
    message: 'duhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhh',
  },
  {
    id: 17,
    threadId: 3,
    starred: false,
    title: mockChat[0].title,
    sender: mockChat[0].sender,
    status: mockChat[0].status,
    sentAt: mockChat[0].sentAt,
    message: mockChat[0].message,
  },
];
