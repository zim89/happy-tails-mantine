import React from 'react'
import logo from '../../../assets/logos/footerLogo.svg';
import Image from 'next/image';
import { Box, Text } from '@mantine/core';
import styles from '../index.module.css'

const FooterInfo: React.FC = () => {
  return (
    <Box>
        <Image src={logo} alt="logo" className='h-[48px] '/>
        <Box className={styles.text_container}>
          <Text className={styles.contact}>CONTACT US</Text>
          <Text className={styles.text}>We value your queries and feedback. If you have any further questions or need assistance, please feel free to reach out to us. Don't hesitate to get in touch with us,  we'll be glad to assist you!</Text> 
        </Box>
    </Box>
  )
}

export default FooterInfo