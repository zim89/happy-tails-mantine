import { useUpdateCategoryMutation } from '@/shared/api/categoryApi';
import classes from './classes.module.css';
import { useContext } from 'react';
import { notifyContext } from '@/shared/context/notification.context';
import { useDisclosure } from '@mantine/hooks';
import { isNotEmpty, useForm } from '@mantine/form';
import { isAxiosQueryError, isErrorDataString } from '@/shared/lib/helpers';
import {
  InputLabel,
  Modal,
  TextInput,
  Tooltip,
  UnstyledButton,
} from '@mantine/core';
import ModalHeader from '@/components/ModalHeader';
import { cn } from '@/shared/lib/utils';
import { Info } from 'lucide-react';
import ModalFooter from '@/components/ModalFooter';

export default function UpdateCodeModal() {
  const [dispatch] = useUpdateCategoryMutation();
  const { setNotification } = useContext(notifyContext);

  const [opened, { open, close }] = useDisclosure(false);
  const form = useForm({
    initialValues: {
      categoryName: '',
    },

    validate: {
      categoryName: isNotEmpty('The category name should be filled'),
    },
  });

  const clearAndClose = () => {
    form.reset();
    close();
  };

  const handleSubmit = async ({ categoryName }: (typeof form)['values']) => {
    try {
      let requestBody = {
        name: categoryName,
      };

      await dispatch({ req: requestBody }).unwrap();

      clearAndClose();
      setNotification('Success', 'Changes saved!');
    } catch (err) {
      clearAndClose();
      if (isAxiosQueryError(err)) {
        setNotification(
          'Failed',
          isErrorDataString(err.data) ? err.data : err.data.message
        );
      }
      console.error(err);
    }
  };

  return (
    <>
      <UnstyledButton className={classes.actionButton} onClick={open}>
        Edit
      </UnstyledButton>

      <Modal
        size={694}
        opened={opened}
        classNames={{
          header: classes.modalHeader,
          content: classes.modalContent,
        }}
        onClose={close}
      >
        <ModalHeader heading='Update Category' handleClose={close} />

        <form>
          <TextInput
            classNames={{
              root: 'form-root',
              label: 'form-label',
              wrapper: 'flex border-2 p-2 gap-2 focus:outline outline-2',
              section: 'static w-auto text-secondary whitespace-nowrap',
              input: cn(
                'form-input rounded-sm border-0 p-0 outline-none',
                form?.errors?.categoryName && 'form-error--input'
              ),
              error: 'form-error',
            }}
            withErrorStyles
            type='text'
            label='Category Name'
            {...form.getInputProps('categoryName')}
          />

          <InputLabel
            classNames={{
              label: classes.fileLabel,
            }}
          >
            <span>Image</span>
            <Tooltip label='.png, .jpeg, .gif, .webp'>
              <Info size={16} className='cursor-pointer' />
            </Tooltip>
          </InputLabel>
        </form>

        <ModalFooter
          singleBtn={false}
          secondaryBtnText='Cancel'
          secondaryBtnOnClick={clearAndClose}
          primaryBtnText='Save'
          primaryBtnOnClick={() => form.onSubmit(handleSubmit)}
        />
      </Modal>
    </>
  );
}
