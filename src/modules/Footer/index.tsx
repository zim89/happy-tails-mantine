import React from 'react'
import styles from './index.module.css'
import FooterInfo from './ui/FooterInfo';
import { Box } from '@mantine/core';


const Footer: React.FC = () => {
  return (
    <Box className={styles.footer}>
         <FooterInfo/>
    </Box>
  )
}

export default Footer;