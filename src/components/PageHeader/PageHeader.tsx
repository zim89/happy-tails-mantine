import classes from './classes.module.css';

export type Props = {
  children(group: typeof PageHeader.group): React.ReactNode;
  rightSection?: React.ReactNode;
};

export default function PageHeader({ children, rightSection = null }: Props) {
  return (
    <>
      <div className={classes.header} role='rowgroup'>
        {children(PageHeader.group)}
        {rightSection && rightSection}
      </div>
    </>
  );
}

const Group = (props: { title: string; additional?: string }) => (
  <hgroup role='group'>
    <h2>{props.title}</h2>
    {props.additional && (
      <p data-testid='additional-text'>{props.additional}</p>
    )}
  </hgroup>
);

PageHeader.group = Group;
