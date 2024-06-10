import { CustomBadge } from '@/components/Badge';
import { Box } from '@mantine/core';
import { Actions } from './components/Actions';

const mockChat = {
  id: 1,
  author: 'Everett Huel',
  authorEmail: 'ddobosiewicz@almatur.pl',
  status: 'new',
  sent: 'Aug 26, 2023 (02:30)',
  recipientEmail: 'admin@example.com',
  subject: 'Warranty and Returns',
  content:
    'Ad rem voluptatem dolorum qui. Dolorem minima aut. Porro asperiores harum officia voluptatem autem explicabo explicabo qui tenetur. Recusandae similique quis debitis et dolorum tempora. Temporibus distinctio ipsa exercitationem enim provident nisi incidunt. Aliquid laboriosam consequatur nesciunt quasi nihil et. Ut tempora molestiae. Quod voluptas delectus at aliquid. Iure ut repudiandae. Voluptatem possimus ducimus molestias dicta mollitia minima deleniti. Ut rerum qui autem voluptatibus earum quia officia. Debitis nulla commodi repellat libero sint voluptas deleniti praesentium ut. Voluptas harum cupiditate in itaque ea at eum rerum. Itaque voluptate ea est et aliquam aliquam eum culpa. Qui sed magnam et hic facere eum laborum magnam ratione.',
  attachments: [],
};

type Props = {
  id: string;
};

export default function ChatRoom({ id }: Props) {
  return (
    <Box className='rounded border border-[#EEEEEE] bg-white p-6'>
      <div className='flex items-center justify-between'>
        <div>
          <b>{mockChat.author}</b>
          <span className='px-2 text-sm text-[#5A5A5A]'>
            {mockChat.authorEmail}
          </span>
          {mockChat.status === 'new' && (
            <CustomBadge
              name={mockChat.status.toUpperCase()}
              color={mockChat.status}
              palette={{ new: '#4285F4' }}
            />
          )}
        </div>
        <div className='flex items-center gap-6'>
          <span className='text-sm text-[#5A5A5A]'>{mockChat.sent}</span>
          <Actions messageId={id} />
        </div>
      </div>
      <span className='text-sm text-[#5A5A5A]'>
        to {mockChat.recipientEmail}
      </span>
    </Box>
  );
}
