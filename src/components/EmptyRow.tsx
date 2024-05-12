type Props = {
    message: string;
    visible: boolean;
}
export const EmptyRow = ({ visible, message }: Props) => {
    if (!visible) return;

  return (
    <p className='border-[1px] border-[#EEE] p-4 text-sm/[21px] text-[#787878]'>
      {message}
    </p>
  );
};
