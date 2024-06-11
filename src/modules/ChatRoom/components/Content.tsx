import { Container } from './Container';

type Props = {
  message: string;
};

export const Content = ({ message }: Props) => {
  return (
    <Container>
      <div className='text-sm/[21px]'>
        {/* Preserve whitespaces of plain text */}
        <p className='whitespace-pre-line'>{message}</p>
      </div>
    </Container>
  );
};
