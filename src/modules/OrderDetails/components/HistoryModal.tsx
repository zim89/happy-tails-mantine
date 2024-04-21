import { Button, Modal, Table } from '@mantine/core';
import { Clock3 } from 'lucide-react';

import styles from '@/modules/AddProductModal/AddProductModal.module.css';
import { useDisclosure } from '@mantine/hooks';
import ModalHeader from '@/components/ModalHeader';

export const HistoryModal = () => {
  const [isOpened, { open, close }] = useDisclosure();

  return (
    <>
      <Button classNames={{ root: 'bg-black' }} onClick={open}>
        <Clock3 size={20} className='mr-2' />
        History
      </Button>

      <Modal
        size={765}
        opened={isOpened}
        onClose={close}
        classNames={{
          header: styles.modalHeader,
          content: styles.modalContent,
        }}
      >
        <ModalHeader heading='History' handleClose={close} />
        <Table>
          <Table.Thead classNames={{ thead: "bg-[#EEE] text-[#787878] uppercase text-xs" }}>
            <Table.Tr>
              <Table.Th classNames={{ th: "p-4" }}>Date</Table.Th>
              <Table.Th>Status</Table.Th>
            </Table.Tr>
          </Table.Thead>
          <Table.Tbody>

          </Table.Tbody>
        </Table>
      </Modal>
    </>
  );
};
