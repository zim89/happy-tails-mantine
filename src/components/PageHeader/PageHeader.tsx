import { CSSProperties } from 'react';
import classes from './classes.module.css';

export type Props = {
  children(group: typeof PageHeader.group): React.ReactNode;
  rightSection?: React.ReactNode;
  style?: CSSProperties;
};

export default function PageHeader({
  children,
  rightSection = null,
  style = {},
}: Props) {
  return (
    <>
      <div className={classes.header} role='rowgroup' style={style}>
        {children(PageHeader.group)}
        {rightSection && rightSection}
      </div>
    </>
  );
}

const Group = (props: { title: string; additional?: React.ReactNode }) => (
  <hgroup role='group'>
    <h2>{props.title}</h2>
    {props.additional && (
      <p data-testid='additional-text'>{props.additional}</p>
    )}
  </hgroup>
);

PageHeader.group = Group;
