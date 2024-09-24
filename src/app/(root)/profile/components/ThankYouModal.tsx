import { Modal, UnstyledButton } from '@mantine/core';
import { X } from 'lucide-react';
import Link from 'next/link';

type Props = {
  opened: boolean;
  close: () => void;
};
export const ThankYouModal = ({ close, opened }: Props) => {
  return (
    <Modal
      size={572}
      opened={opened}
      classNames={{
        header: 'hidden',
        body: 'p-0 flex flex-col items-center',
      }}
      onChange={() => {}}
      onClose={close}
    >
      <span className='absolute right-4 top-6 cursor-pointer' onClick={close}>
        <X />
      </span>
      <hgroup className='p-12 pb-8 text-center'>
        <h1 className='mb-4 text-4xl/[2.7rem]'>Thank you for your request!</h1>
        <p>
          {
            "We've received your inquiry and are reviewing it carefully. Detailed instructions will follow shortly. Thank you for your patience."
          }
        </p>
      </hgroup>
      <UnstyledButton
        classNames={{
          root: 'bg-secondary font-bold mb-8 rounded-sm text-primary text-center py-[10px] w-full max-w-[calc(100%-48px)] md:max-w-[164px] whitespace-pre',
        }}
      >
        <Link href='/'>Back to homepage</Link>
      </UnstyledButton>
    </Modal>
  );
};
