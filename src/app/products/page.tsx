import React from 'react';
import { Box, Container } from '@mantine/core';
import styles from './styles.module.css';

export default function ProductsPage() {
  return (
    <div className='h-screen bg-teal-400'>
      <Container>
        <Box className={styles.wrap}>xsdbdsfbdfbdfb</Box>
        <div className='h-12 bg-red-500'></div>
      </Container>
      <div className='container h-12 bg-yellow-500'>
        <h2 className='bg-secondary text-2xl font-bold text-red-900'>
          All products
        </h2>
      </div>
    </div>
  );
}
