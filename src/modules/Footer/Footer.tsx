import React from 'react';
import { Container } from '@mantine/core';
import Image from 'next/image';
import Link from 'next/link';

import FooterNav from './ui/FooterNav';
import SocialLinks from './ui/SocialLinks';
import logoImg from '@/assets/logo/logo-footer.svg';
import classes from './lib/classes.module.css';

export default function Footer(): React.JSX.Element {
  return (
    <footer className={classes.wrapper}>
      <Container>
        <div className={classes.topFooter}>
          <Link href='/'>
            <Image
              src={logoImg}
              alt='Happy tails logo'
              style={{ width: 'auto', height: 'auto' }}
              className={classes.logo}
            />
          </Link>
          <div className={classes.contactSection}>
            <h2 className={classes.heading}>Contact us</h2>
            <p className={classes.paragraph}>
              We value your queries and feedback. If you have any further
              questions or need assistance, please feel free to reach out to us.
              Don&apos;t hesitate to get in touch with us, we&apos;ll be glad to
              assist you!
            </p>
            <a
              href='mailto:onlinestore.teamch2023@gmail.com'
              className={classes.email}
            >
              onlinestore.teamch2023@gmail.com
            </a>

            <SocialLinks />
          </div>
        </div>

        <FooterNav />

        <div className={classes.links}>
          <p className={classes.copyright}>
            <span>© 2023</span>
            <span>Happy Tails</span>
          </p>
          <Link className={classes.cookiePolicyLink} href='/privacy&cookies'>
            Privacy & Cookies Policy
          </Link>
          <div className={classes.fullRow}>
            <a href={'#Team'} className={classes.author}>
              Website by Team
            </a>
          </div>
        </div>
      </Container>
    </footer>
  );
}
