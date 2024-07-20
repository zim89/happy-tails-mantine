import Image from 'next/image';

const logoAlt =
  "The logo depicts a simplified, right-facing, bright orange dog's head with a large, floppy ear and a single black-dot eye, encased within an black circular border.";

function Logo() {
  return (
    <>
      <Image
        src='/logo/logo-mobile.svg'
        height={42}
        width={43}
        alt={logoAlt}
        className='md:hidden'
      />
      <Image
        src='/logo/logo-tablet.svg'
        width={237}
        height={42}
        alt={`${logoAlt} After logo placed text: Happy Tails`}
        className='hidden md:max-lg:block'
      />
      <Image
        src='/logo/logo-desktop.svg'
        height={54}
        width={283}
        alt={`${logoAlt} After logo placed text: Happy Tails`}
        className='hidden lg:block'
      />
    </>
  );
}

export default Logo;
