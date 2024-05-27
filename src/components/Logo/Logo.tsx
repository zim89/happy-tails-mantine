import Image from 'next/image';

import logoMobile from '@/assets/logo/logo-mobile.svg';
import logoTablet from '@/assets/logo/logo-tablet.svg';
import logoDesktop from '@/assets/logo/logo-desktop.svg';

const logoAlt =
  "The logo depicts a simplified, right-facing, bright orange dog's head with a large, floppy ear and a single black-dot eye, encased within an black circular border.";

function Logo() {
  return (
    <>
      <Image src={logoMobile} alt={logoAlt} className='md:hidden' />
      <Image
        src={logoTablet}
        alt={`${logoAlt} After logo placed text: Happy Tails`}
        className='hidden md:max-lg:block'
      />
      <Image
        src={logoDesktop}
        alt={`${logoAlt} After logo placed text: Happy Tails`}
        className='hidden lg:block'
      />
    </>
  );
}

export default Logo;
