import classes from './classes.module.css';

type Props = {
  children(group: typeof PageHeader.group): React.ReactNode;
  rightSection?: React.ReactNode;
};

export default function PageHeader({ children, rightSection = null }: Props) {
  return (
    <>
      <div className={classes.header}>
        {children(PageHeader.group)}
        {rightSection}
      </div>
    </>
  );
}

const Group = (props: { title: string; additional?: string }) => (
  <hgroup>
    <h2>{props.title}</h2>
    {props.additional && <p>{props.additional}</p>}
  </hgroup>
);

PageHeader.group = Group;
