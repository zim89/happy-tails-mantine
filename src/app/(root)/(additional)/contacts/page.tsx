import Breadcrumbs from '@/components/Breadcrumbs/Breadcrumbs';

import styles from './styles.module.css';
import { ContactForm } from './components/ContactForm';

export default function ContactsPage() {
  return (
    <div className='container'>
      <Breadcrumbs
        crumbs={[{ href: '/', text: 'Home' }, { text: 'Contacts' }]}
        classNames={{ root: 'p-0 pt-4' }}
      />

      <div className={styles.content}>
        <hgroup className={styles.heading}>
          <h1>{"We'd love to hear from you!"}</h1>
          <p>
            Whether you have questions about our products, need assistance with
            an order, or just want to share stories about your furry friend,
            we&apos;re here to help.
          </p>
        </hgroup>

        <ContactForm />

        <p className={styles.partner_message}>
          For partnership opportunities, collaborations, or wholesale inquiries,
          please email us at partnerships@happytails.com. We&apos;re always open
          to new and exciting ventures.
        </p>
      </div>
    </div>
  );
}
