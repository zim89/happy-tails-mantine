'use client';

import { ActionIcon, Menu } from '@mantine/core';
import { MoreHorizontal, Trash2 } from 'lucide-react';
import { MouseEvent, useContext, useState } from 'react';

import DeleteModal from '@/components/DeleteModal';
import { context } from '../lib/utils';
import { brandNotification } from '@/shared/lib/helpers';

type Props = {
  index: number;
};

export const Actions = ({ index }: Props) => {
  const { setSizes } = useContext(context);
  const [opened, setOpened] = useState(false);

  const handleDelete = () => {
    setSizes((prev) => {
      const newSizes = [...prev];
      newSizes.splice(index, 1);
      return newSizes;
    });
    brandNotification('SUCCESS', 'Size deleted successfully!');
    setOpened(() => false);
  };

  const openModal = () => {
    setOpened(true);
  };

  const handleClose = (e: MouseEvent) => {
    // Stop event bubbling ⬆️
    e.stopPropagation();

    setOpened(() => false);
  };

  return (
    <>
      {/* "keepMounted" is used to prevent re-rendering its children which causes flickering */}
      <Menu
        width={148}
        keepMounted
        position='bottom-end'
        styles={{
          dropdown: { width: 'fit-content' },
        }}
      >
        <Menu.Target>
          <ActionIcon className='size-9 border border-brand-grey-400 bg-primary text-secondary hover:bg-brand-grey-300 hover:text-secondary data-[expanded=true]:bg-brand-grey-300'>
            <MoreHorizontal size={16} />
          </ActionIcon>
        </Menu.Target>

        <Menu.Dropdown className='p-0 py-2'>
          <Menu.Item
            leftSection={<Trash2 size={16} />}
            onClick={openModal}
            classNames={{
              item: 'rounded-none hover:bg-brand-grey-200',
              itemLabel: 'p-0',
              itemSection: 'm-0',
            }}
          >
            <Menu.Label>Delete</Menu.Label>
            <DeleteModal>
              {(Modal) => (
                <Modal
                  w={400}
                  opened={opened}
                  onClose={() => setOpened(() => false)}
                  footerProps={{
                    primaryBtnOnClick: handleDelete,
                    primaryBtnText: 'Delete',
                    secondaryBtnText: 'Cancel',
                    secondaryBtnOnClick: (e) => handleClose(e),
                    singleBtn: false,
                  }}
                >
                  <hgroup>
                    <h2 className='mb-3 font-bold'>Delete this size?</h2>
                    <p>Are you sure you want to delete the selected size?</p>
                  </hgroup>
                </Modal>
              )}
            </DeleteModal>
          </Menu.Item>
        </Menu.Dropdown>
      </Menu>
    </>
  );
};
