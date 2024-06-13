import { Container } from '@mantine/core';
import classes from './classes.module.css';
import Breadcrumbs from '@/components/Breadcrumbs';
import Introduction from '@/modules/Introduction';
import TeamList from '@/modules/TeamList';
import Technologies from '@/modules/Technologies';

export default function Page() {
  return (
    <>
      <Container>
        <Breadcrumbs
          crumbs={[{ text: 'Home', href: '/' }, { text: 'About Us' }]}
          classNames={{ root: 'p-0 pt-4' }}
        />
        <hgroup className={classes.heading}>
          <h1>About us</h1>
          <p>
            {`Welcome to our team! We're a creative group ready to exceed
          expectations in the IT field. Together, we discover and implement
          innovative ideas for your success.`}
          </p>
        </hgroup>
      </Container>
      <Introduction />
      <TeamList />
      <Technologies />
    </>
  );
}
