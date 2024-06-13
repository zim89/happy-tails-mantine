type Props = {
  children: React.ReactNode;
};
export const Container = ({ children }: Props) => {
  return <div className='max-w-[653px]'>{children}</div>;
};
