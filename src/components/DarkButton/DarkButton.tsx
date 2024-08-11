import { UnstyledButton } from '@mantine/core';

export type Props = {
  handler: () => void;
  children: React.ReactNode;
  disabled?: boolean;
};

export default function DarkButton({
  handler,
  children,
  disabled = false,
}: Props) {
  return (
    <>
      <UnstyledButton
        disabled={disabled}
        classNames={{
          root: 'disabled:text-brand-grey-500 rounded-[2px] text-sm font-bold bg-black w-[150px] text-center py-[10px] text-white',
        }}
        onClick={handler}
      >
        {children}
      </UnstyledButton>
    </>
  );
}
