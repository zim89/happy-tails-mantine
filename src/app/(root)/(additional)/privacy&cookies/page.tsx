import { Anchor, Container } from '@mantine/core';

import Breadcrumbs from '@/components/Breadcrumbs/Breadcrumbs';

import classes from './classes.module.css';
import { cn } from '@/shared/lib/utils';

export default function PrivacyAndCookiesPage() {
  return (
    <div className='container'>
      <Breadcrumbs
        crumbs={[
          { href: '/', text: 'Home' },
          { text: 'Privacy & Cookies Policy', href: '/privacy&cookies' },
        ]}
        classNames={{ root: 'p-0 pt-4' }}
      />
      <hgroup className='mb-8 mt-5 flex items-center justify-center gap-6'>
        <span className='w-full flex-1 border-b-2 border-brand-grey-400'></span>
        <h1 className='flex-2 heading text-center uppercase'>
          Privacy <br className='md:hidden' /> & Cookies Policy
        </h1>
        <span className='w-full flex-1 border-b-2 border-brand-grey-400'></span>
      </hgroup>
      <div className={classes.section}>
        <h2 className={classes.headSection}>General Information</h2>
        <p>
          This Privacy Policy describes what personal data{' '}
          <span className='font-bold text-brand-orange-400'>Happy Tails</span>,
          which owns and operates the website{' '}
          <span className='font-bold text-brand-orange-400'>Happy Tails</span>{' '}
          selling pet supplies, collects, uses, and protects, and how this data
          is protected. This policy also explains your rights regarding your
          personal information and how you can contact us with any questions
          related to the protection of personal data.
        </p>
      </div>
      <div className={classes.section}>
        <h2 className={classes.headSection}>
          Collection and Use of Information
        </h2>
        <p>
          We may collect the following categories of information when you visit
          our website, register, place an order, or interact with our site:
        </p>
        <ol className={cn(classes.list, 'list-decimal')}>
          <li className='font-bold'>
            Personal Information:{' '}
            <span className='font-normal'>
              Name, email address, phone number, shipping address, etc.
            </span>
          </li>
          <li className='font-bold'>
            Payment Information:{' '}
            <span className='font-normal'>
              Credit cards, payment data, or other information necessary for
              payment processing and order management.
            </span>
          </li>
          <li className='font-bold'>
            Device Information:{' '}
            <span className='font-normal'>
              IP addresses, device types, software versions, language settings,
              and other technical data.
            </span>
          </li>
          <li className='font-bold'>
            Cookies and Other Tracking Technologies:{' '}
            <span className='font-normal'>
              We use cookies and similar technologies to collect information
              about your actions on our site and improve your user experience.
            </span>
          </li>
        </ol>
        <p className='mt-4'>
          We use this information for the following purposes:
        </p>
        <ul className={cn(classes.list, 'list-disc')}>
          <li>Processing and fulfilling your order.</li>
          <li>Providing customer service.</li>
          <li>
            Sending informational materials such as promotions, news, special
            offers, etc., with your consent.
          </li>
          <li>Improving our website and services.</li>
          <li>Analyzing and tracking user trends.</li>
        </ul>
      </div>
      <div className={classes.section}>
        <h2 className={classes.headSection}>Protection of Your Information</h2>
        <p>
          {`We pay great attention to the protection of our customers' personal
          data. We use various technical and organizational measures to protect
          your information from unauthorized access, alteration, disclosure, or
          destruction.`}
        </p>
        <p>
          We do not disclose, sell, exchange, or transfer your personal
          information to third-party organizations without your consent, except
          as required by law.
        </p>
      </div>
      <div className={classes.section}>
        <h2 className={classes.headSection}>Your Rights</h2>
        <p>You have the right to:</p>
        <ul className={cn(classes.list, 'list-disc')}>
          <li>
            Request access to the personal information we hold about you and
            obtain a copy of this information.
          </li>
          <li>
            Request correction of any incorrect or incomplete information we
            hold about you.
          </li>
          <li>
            Delete your personal data from our systems under certain
            circumstances.
          </li>
        </ul>
      </div>
      <div className={classes.section}>
        <h2 className={classes.headSection}>Cookies</h2>
        <p>
          We use cookies and similar tracking technologies to enhance your
          browsing experience and collect information about how you interact
          with our website. Cookies are small text files stored on your device.
          By using our website, you consent to the use of cookies as outlined in
          this policy.
        </p>
        <p>Types of Cookies We Use:</p>
        <ul className={cn(classes.list, 'list-disc')}>
          <li className='font-bold'>
            Essential Cookies:{' '}
            <span className='font-normal'>
              Necessary for the functioning of the website.
            </span>
          </li>
          <li className='font-bold'>
            Marketing Cookies:{' '}
            <span className='font-normal'>
              Used to deliver personalized advertisements.
            </span>
          </li>
          <li className='font-bold'>
            Analytical Cookies:{' '}
            <span className='font-normal'>
              Used to analyze website traffic and usage patterns.
            </span>
          </li>
          <li className='font-bold'>
            Preference Cookies:{' '}
            <span className='font-normal'>
              Remember your preferences and settings.
            </span>
          </li>
        </ul>
        <p className='mt-4'>
          The length of time that a cookie remains on your computer or mobile
          device depends on whether it is a “persistent” or “session” cookie.
          Session cookies last until you stop browsing and persistent cookies
          last until they expire or are deleted. Most of the cookies we use are
          persistent and will expire between 30 minutes and two years from the
          date they are downloaded to your device.
        </p>
        <p>
          You can control and manage cookies in various ways. Please keep in
          mind that removing or blocking cookies can negatively impact your user
          experience and parts of our website may no longer be fully accessible.
        </p>
        <p>
          Most browsers automatically accept cookies, but you can choose whether
          or not to accept cookies through your browser controls, often found in
          your browser&apos;s “Tools” or “Preferences” menu. For more
          information on how to modify your browser settings or how to block,
          manage or filter cookies can be found in your browser&apos;s help file
          or through such sites as:{' '}
          <Anchor
            className='text-brand-blue underline'
            href='https://allaboutcookies.org'
            target='_blank'
          >
            www.allaboutcookies.org.
          </Anchor>
        </p>
        <p>
          Additionally, please note that blocking cookies may not completely
          prevent how we share information with third parties such as our
          advertising partners. To exercise your rights or opt-out of certain
          uses of your information by these parties, please follow the
          instructions in the “Behavioural Advertising” section above.
        </p>
      </div>
      <div className={classes.section}>
        <h2 className={classes.headSection}>Changes to this Policy</h2>
        <p>
          We reserve the right to update or modify this Privacy & Cookies Policy
          at any time. Any changes will be effective immediately upon posting
          the updated policy on this page. Your continued use of our website
          after any changes indicates your acceptance of the revised policy.
        </p>
      </div>
      <div className={classes.section}>
        <h2 className={classes.headSection}>Contact Us</h2>
        <p>
          {`If you have any questions or concerns about our Privacy & Cookies
          Policy, please contact us using the information provided below:`}
        </p>
        <Anchor
          href='mailto:onlinestore.teamch2023@gmail.com'
          className='block pt-4 text-brand-blue underline'
        >
          onlinestore.teamch2023@gmail.com
        </Anchor>
      </div>
      <p className='my-8'>Last Updated: 24/03/2024</p>
    </div>
  );
}
