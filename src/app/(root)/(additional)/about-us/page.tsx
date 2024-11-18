import classes from './classes.module.css';
import Introduction from '@/modules/Introduction';
import TeamList from '@/modules/TeamList';
import Technologies from '@/modules/Technologies';

export default function Page() {
  return (
    <>
      <div className='container px-0'>
        <hgroup className={classes.heading}>
          <h1>About us</h1>
          <p>
            {`Welcome to our team! We're a creative group ready to exceed
          expectations in the IT field. Together, we discover and implement
          innovative ideas for your success.`}
          </p>
        </hgroup>
        <Introduction />
        <TeamList />
        <Technologies />
      </div>
    </>
  );
}
