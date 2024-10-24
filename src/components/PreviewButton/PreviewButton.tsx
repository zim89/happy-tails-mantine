import { Eye } from 'lucide-react';
import { UnstyledButton } from '@mantine/core';
import { CSSProperties } from 'react';

export type Props = {
  handler: () => void;
  color?: CSSProperties['color'];
};
export default function PreviewButton({ handler, color = 'black' }: Props) {
  return (
    <UnstyledButton
      data-testid='preview-button'
      style={{
        color,
      }}
      classNames={{
        root: 'flex items-center gap-2 hover:bg-brand-grey-300 px-4 rounded',
      }}
      onClick={handler}
    >
      <Eye size={20} color={color} /> Preview
    </UnstyledButton>
  );
}
