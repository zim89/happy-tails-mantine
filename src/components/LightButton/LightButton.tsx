import { UnstyledButton } from '@mantine/core';

export type Props = {
  handler: () => void;
  children: React.ReactNode;
  disabled?: boolean;
};

export default function LightButton({
  handler,
  children,
  disabled = false,
}: Props) {
  return (
    <>
      <UnstyledButton
        disabled={disabled}
        classNames={{
          root: 'text-black text-sm font-bold border w-[150px] text-center rounded-[2px] border-[#C8C8C8] border-solid py-[10px]',
        }}
        onClick={handler}
      >
        {children}
      </UnstyledButton>
    </>
  );
}
