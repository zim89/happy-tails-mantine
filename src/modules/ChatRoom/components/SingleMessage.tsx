'use client';

import { Box, Collapse, UnstyledButton } from '@mantine/core';
import { Dot, Download, Trash2 } from 'lucide-react';
import { useDisclosure } from '@mantine/hooks';
import Image from 'next/image';

import { SingleMessage as TSingleMessage, iconMap } from '../lib';
import { CustomBadge } from '@/components/Badge';
import { Actions } from './Actions';
import { Content } from './Content';
import { convertBytes, formatShortDateFromUnix } from '@/shared/lib/helpers';

type Props = TSingleMessage;

export const SingleMessage = ({
  id,
  attachments,
  message,
  recipientEmail,
  sender,
  senderEmail,
  sentAt,
  status,
  threadId,
  title,
}: Props) => {
  const [opened, { toggle }] = useDisclosure();

  return (
    <Box
      key={id}
      className='rounded border border-[#EEEEEE] bg-white px-4 py-4 md:px-6'
    >
      <div className='flex items-center justify-between'>
        <div onClick={toggle} className='cursor-pointer'>
          <b className='mr-2'>{sender}</b>
          {opened && (
            <span className='px-2 text-sm text-[#5A5A5A]'>{senderEmail}</span>
          )}
          {status === 'unread' && (
            <CustomBadge
              name='NEW'
              color={status}
              palette={{ unread: '#4285F4' }}
            />
          )}
          {!opened && (
            <p className='mt-2 max-w-[630px] overflow-hidden text-ellipsis whitespace-nowrap text-sm text-[#5A5A5A]'>
              {message}
            </p>
          )}
        </div>
        <div className='flex items-center gap-6'>
          <span className='text-sm text-[#5A5A5A]'>{sentAt}</span>
          <Actions messageId={id} />
        </div>
      </div>
      {opened && (
        <span className='text-sm text-[#5A5A5A]'>to {recipientEmail}</span>
      )}

      <Collapse in={opened}>
        {/* Content */}
        <div className='pb-4 pt-10'>
          <h3 className='mb-4 text-lg font-bold text-[#333333]'>{title}</h3>
          <Content message={message} />
        </div>

        {/* Attachments */}
        {attachments.length > 0 && (
          <div className='border-t border-t-[#C8C8C8]'>
            <h4 className='my-4 font-bold'>Attachment</h4>
            <ul className='flex gap-4'>
              {attachments.map((attachment, index) => (
                <li
                  key={index}
                  className='flex items-center gap-3 border border-[#C8C8C8] p-4'
                >
                  <Image
                    src={iconMap[attachment.type]}
                    alt={attachment.name}
                    width={24}
                    height={24}
                  />
                  <div>
                    <h5 className='text-sm/[16px] font-bold'>
                      {attachment.name}
                    </h5>
                    <p className='inline-flex items-center whitespace-pre text-sm text-[#787878] md:min-w-[220px]'>
                      <span>{convertBytes(attachment.size)}</span>
                      <Dot />
                      <span>
                        {formatShortDateFromUnix(attachment.lastModified)}
                      </span>
                    </p>
                  </div>
                  <div className='flex items-center gap-2'>
                    <UnstyledButton title='Download'>
                      <Download size={16} color='#787878' />
                    </UnstyledButton>
                    <UnstyledButton title='Delete'>
                      <Trash2 size={16} color='#787878' />
                    </UnstyledButton>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        )}
      </Collapse>
    </Box>
  );
};
