type Props = {
  message: string;
};

export const Content = ({ message }: Props) => {
  return (
    <div className='container'>
      <div className='text-sm/[21px]'>
        {/* Preserve whitespaces of plain text */}
        <p className='whitespace-pre-line'>{message}</p>
      </div>
    </div>
  );
};
