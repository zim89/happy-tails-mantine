import { LoaderProps, Loader as MantineLoader } from '@mantine/core';

export default function Loader(props: LoaderProps) {
  return (
    <MantineLoader
      size={15}
      classNames={{ root: 'px-1' }}
      color='#A0A0A0'
      {...props}
    />
  );
}
