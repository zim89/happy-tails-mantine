type Props = {
    current: number;
    pageSize: number;
    size: number;
}

export const EntriesCount = ({ current, pageSize, size }: Props) => {
    return (
        <p className='text-sm/[21px]'>
        {`Displaying ${current} to ${pageSize} of ${size} entries`}
      </p>
    );
}