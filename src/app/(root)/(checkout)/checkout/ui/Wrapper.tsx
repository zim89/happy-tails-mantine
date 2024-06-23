export default function Wrapper({ children }: { children: React.ReactNode }) {
  return <div className='bg-brand-grey-200 p-6'>{children}</div>;
}
