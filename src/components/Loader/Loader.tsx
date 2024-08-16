import { LoaderProps, Loader as MantineLoader } from '@mantine/core';

export type Props = LoaderProps;

export default function Loader(props: Props) {
  return (
    <MantineLoader
      data-testid='loader'
      size={15}
      classNames={{ root: 'px-1' }}
      color='#A0A0A0'
      {...props}
    />
  );
}
