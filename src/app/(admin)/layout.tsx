import { NotifyProvider } from '@/shared/context/notification.context';

type Props = { children: React.ReactNode; params: any };

export default function Layout({ children, params }: Props) {
  console.log(params);
  return <NotifyProvider>{children}</NotifyProvider>;
}
