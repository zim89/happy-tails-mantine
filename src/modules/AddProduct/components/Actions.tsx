'use client';

import { ActionIcon, Menu } from '@mantine/core';
import { MoreHorizontal, Trash2 } from 'lucide-react';
import { MouseEvent, useContext, useEffect, useMemo, useState } from 'react';

import { notifyContext } from '@/shared/context/notification.context';
import DeleteModal from '@/components/DeleteModal';
import { context } from '../lib/utils';

type Props = {
  criteria: number;
};

export const Actions = ({ criteria }: Props) => {
  const { setNotification, setParams } = useContext(notifyContext);
  const { variants, setVariants } = useContext(context);
  const [opened, setOpened] = useState(false);

  const id = useMemo(
    () =>
      variants.findIndex(
        (variant) =>
          variant &&
          variant.values.variantImage &&
          variant.values.variantImage.lastModified === criteria
      ),
    [criteria]
  );

  useEffect(() => {
    setParams((prev) => ({
      success: {
        ...prev.success,
        text: 'Variant deleted successfully!',
      },
      failed: prev.failed,
    }));
  }, []);

  const handleDelete = () => {
    setVariants((prev) => prev.filter((_, vindex) => vindex !== id));
    setOpened(() => false);
    setNotification('Success', 'Variant deleted successfully!');
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
                    <h2 className='mb-3 font-bold'>{`Delete this variant?`}</h2>
                    <p>Are you sure you want to delete the selected variant?</p>
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
