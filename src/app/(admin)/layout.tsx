import { NotifyProvider } from '@/shared/context/notification.context';

type Props = { children: React.ReactNode };

export default function Layout({ children }: Props) {
  return <NotifyProvider>{children}</NotifyProvider>;
}
