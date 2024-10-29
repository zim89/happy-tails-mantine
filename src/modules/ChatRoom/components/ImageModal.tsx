import { Modal } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { Eye } from 'lucide-react';
import Image from 'next/image';

export const ImageModal = ({ src }: { src: string }) => {
  const [opened, { open, close }] = useDisclosure(false);
  return (
    <>
      <button type='button' onClick={open} className='btn-icon'>
        <Eye className='size-5' />
      </button>

      <Modal opened={opened} onClose={close} centered size='50%'>
        <div className='relative h-[600px]'>
          <Image
            src={src}
            alt='Attachment image'
            fill
            className='cent w-full object-contain object-center'
          />
        </div>
      </Modal>
    </>
  );
};
