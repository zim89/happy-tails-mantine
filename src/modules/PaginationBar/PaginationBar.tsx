import PaginationNextBtn from "@/components/PaginationNextBtn";
import PaginationPrevBtn from "@/components/PaginationPrevBtn";
import { Pagination, Group, PaginationProps } from "@mantine/core";

import styles from "./PaginationBar.module.css";

export default (props: PaginationProps) => {    
    return (
      <Pagination.Root
        className='mt-12'
        {...props}
        classNames={{
          control: 'pagination-control',
          dots: 'pagination-dots',
          root: 'mt-6 md:mt-12 lg:mt-[72px]',
        }}
      >
        <Group gap={0} justify='end'>
          <div className={styles.paginationOptions}>
            <Pagination.Previous icon={PaginationPrevBtn} />
            <Pagination.Items />
            <Pagination.Next icon={PaginationNextBtn} />
          </div>
        </Group>
      </Pagination.Root>
    );
  };