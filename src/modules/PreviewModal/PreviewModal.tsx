import Modal from '@/components/ModalWindow';
import ModalFooter from '@/components/ModalFooter';
import { UnstyledButton } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';

export default function PreviewModal() {
    const [opened, { open, close }] = useDisclosure();

    return (
        <>
            <UnstyledButton onClick={open}>
                Update
            </UnstyledButton>

            <Modal opened={opened} onClose={close}>
                <ModalFooter
                    primaryBtnOnClick={() => { }}
                    primaryBtnText='Close'
                    singleBtn
                />
            </Modal>
        </>
    );
}