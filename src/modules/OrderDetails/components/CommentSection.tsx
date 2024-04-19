import { Textarea, Button } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { Edit2 } from 'lucide-react';

export const CommentSection = () => {
  const [
    areCommentsOpened,
    { open: openComments, close: closeComments, toggle: toggleComments },
  ] = useDisclosure(false);

  return (
    <div className='col-span-2 px-4 pb-4 rounded-[4px] border-[1px] border-[#EEE] bg-white'>
      <div className='flex items-center justify-between py-[22px]'>
        <h2 className='text-xl font-bold'>Comments</h2>
        <Button
          classNames={{
            root: 'border-[1px] border-[#C8C8C8] w-[36px] h-[36px] p-0',
          }}
          onClick={toggleComments}
        >
          <Edit2 size={16} color='black' />
        </Button>
      </div>
      {areCommentsOpened && (
        <>
          <Textarea label='Add comments' rows={10} mb={22} />
          <Button
            py={10}
            px={50}
            mr={42}
            radius={2}
            c='black'
            classNames={{ root: 'border-[1px] border-[#EEE]' }}
            onClick={closeComments}
          >
            Cancel
          </Button>
          <Button
            py={10}
            px={50}
            radius={2}
            bg='black'
            onClick={toggleComments}
          >
            Save
          </Button>
        </>
      )}
    </div>
  );
};
