import { AppProviders } from '@/shared/config/AppProviders';
import theme from '@/shared/config/theme';
import { MantineProvider } from '@mantine/core';

type Props = {
  children: React.ReactNode;
};
export const TestWrapper = ({ children }: Props) => {
  return (
    <AppProviders>
      <MantineProvider theme={theme}>{children}</MantineProvider>
    </AppProviders>
  );
};
