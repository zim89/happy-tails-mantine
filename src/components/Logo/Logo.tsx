import Image from 'next/image';

const logoAlt =
  "The logo depicts a simplified, right-facing, bright orange dog's head with a large, floppy ear and a single black-dot eye, encased within an black circular border.";

type Props = {
  themed?: true;
};

function Logo({ themed }: Props) {
  return (
    <>
      <Image
        data-testid='logo'
        src={themed ? '/logo/themed-logo-mobile.svg' : '/logo/logo-mobile.svg'}
        height={42}
        width={43}
        alt={logoAlt}
        className='md:hidden'
      />
      <Image
        data-testid='logo'
        src={themed ? '/logo/themed-logo-tablet.svg' : '/logo/logo-tablet.svg'}
        width={237}
        height={42}
        alt={`${logoAlt} After logo placed text: Happy Tails`}
        className='hidden md:max-lg:block'
      />
      <Image
        data-testid='logo'
        src={
          themed ? '/logo/themed-logo-desktop.svg' : '/logo/logo-desktop.svg'
        }
        height={54}
        width={283}
        alt={`${logoAlt} After logo placed text: Happy Tails`}
        className='hidden lg:block'
      />
    </>
  );
}

export default Logo;
