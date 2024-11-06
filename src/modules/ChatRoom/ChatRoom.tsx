'use client';

import { notFound } from 'next/navigation';
import { useFindOneQuery } from '@/shared/api/feedbackApi';
import { useEffect } from 'react';
import { Badge } from '@mantine/core';
import { BADGE_PALETTE } from '../AdminInboxDisplay/lib/inbox.const';
import { Actions } from './components/Actions';
import dayjs from 'dayjs';
import Image from 'next/image';
import {
  FileTypeIcons,
  type FileType,
} from '@/shared/constants/file-types.const';
import { ReplyMessage } from './components/ReplyMessage';
import { Download } from 'lucide-react';
import { ImageModal } from './components/ImageModal';
import { ChatRoomSkeleton } from './components/Skeleton';

export default function ChatRoom({ id }: { id: string }) {
  const { data, isError, isLoading } = useFindOneQuery(id);

  useEffect(() => {
    if (isError) {
      notFound();
    }
  }, [isError]);

  if (isLoading) return <ChatRoomSkeleton />;

  return (
    <>
      {data && (
        <>
          <div className='space-y-2'>
            {data.replyOfManager && (
              <div className='flex items-center justify-between rounded border border-brand-grey-300 bg-primary px-6 py-4'>
                <div className='w-[630px] space-y-1'>
                  <p className='text-base font-bold'>Admin</p>
                  <p className='text-sm/[21px]'>{data.replyOfManager}</p>
                </div>
                <div className='flex items-center gap-6'>
                  <p className='text-sm/[21px] text-brand-grey-900'>
                    {dayjs
                      .unix(data.managerRepliedAt as number)
                      .format('DD MMM, YYYY (HH:mm)')}
                  </p>
                </div>
              </div>
            )}

            <div className='rounded border border-brand-grey-300 bg-primary p-6'>
              <div className='mb-10 flex items-center justify-between'>
                <div className='flex items-baseline gap-2'>
                  <p className='text-base font-bold'>{data.userName}</p>
                  <p className='text-sm/[21px] text-brand-grey-900'>
                    {data.userEmail}
                  </p>
                  <Badge color={BADGE_PALETTE[data.feedbackStatus]}>
                    {data.feedbackStatus}
                  </Badge>
                </div>
                <div className='flex items-center gap-6'>
                  <p className='text-sm/[21px] text-brand-grey-900'>
                    {dayjs.unix(data.sentAt).format('DD MMM, YYYY (HH:mm)')}
                  </p>
                  <Actions message={data} />
                </div>
              </div>

              {/* Message + Attachment */}
              <div className='flex flex-col gap-4'>
                <p className='w-[630px] text-sm/[21px]'>{data.content}</p>

                {data.imageSrc && data.imageSrc.length > 0 && (
                  <div>
                    <h3 className='py-4 text-base font-bold'>Attachment</h3>
                    <ul className='grid grid-cols-3 gap-4'>
                      {data.imageSrc.map((src: string, i: number) => {
                        const fileExtension = src.split('.').pop() as
                          | FileType
                          | undefined;

                        if (fileExtension && FileTypeIcons[fileExtension]) {
                          console.log(fileExtension);
                          console.log(FileTypeIcons[fileExtension]);
                          return (
                            <li
                              key={i}
                              className='flex items-center justify-between rounded-sm border border-brand-grey-400 p-4'
                            >
                              <div className='flex flex-1 items-center gap-3'>
                                <Image
                                  src={FileTypeIcons[fileExtension]}
                                  alt='File icon'
                                  width={24}
                                  height={24}
                                />
                                <p className='text-sm/[16.8px] font-bold'>
                                  {src.split('/').pop()}
                                </p>
                              </div>
                              <div className='flex items-center'>
                                <ImageModal src={src} />
                                <a href={src} download className='btn-icon'>
                                  <Download className='size-5' />
                                </a>
                              </div>
                            </li>
                          );
                        }
                        return null;
                      })}
                    </ul>
                  </div>
                )}
              </div>
            </div>
          </div>

          <ReplyMessage message={data} />
        </>
      )}
    </>
  );
}
