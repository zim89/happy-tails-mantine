import { Mail, Trash2 } from "lucide-react";

import DeleteModal from "@/components/DeleteModal";
import { useDisclosure } from "@mantine/hooks";

import styles from "./DeleteMessagesModal.module.css";

type Props = {
    messages: number[];
    setNotification: (type: "Success" | "Failed", text?: string) => void;
};

export default function DeleteMessagesModal({ messages, setNotification }: Props) {    
    const [openedMain, { open: openMain, close: closeMain }] = useDisclosure(false);
    
    const handleDelete = () => {
        setNotification("Failed", "It's not implemented yet... Sorry");
        closeMain();
    }

    return (
        <DeleteModal>
            {(Modal) => {
                return (
                    <>
                        {/* Button to open main modal */}
                        <span className="text-sm flex items-center gap-2 cursor-pointer" onClick={openMain}><Trash2 size={16} />Delete</span>

                        <Modal
                            keepMounted
                            onClose={closeMain}
                            opened={openedMain}
                            footerProps={{
                                singleBtn: false,
                                secondaryBtnOnClick: closeMain,
                                secondaryBtnText: 'Cancel',
                                primaryBtnOnClick: handleDelete,
                                primaryBtnText: 'Delete',
                                containerStyles: { display: 'flex', justifyContent: 'end' },
                            }}
                        >
                            <div className={styles.message}>
                                <Mail size={64} />
                                <hgroup>
                                    {messages.length === 1 ? <h2>Delete the message?</h2> : <h2>{`Delete ${messages.length} messages?`}</h2>}
                                   
                                    <p>
                                        This action cannot be undone. Please confirm that you want
                                        to proceed.
                                    </p>
                                </hgroup>
                            </div>
                        </Modal>
                    </>
                );
            }}
        </DeleteModal>
    );
};