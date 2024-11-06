import classes from '../classes.module.css';

export const sharedProps = {
  toolbarBtn: {
    styles: {
      control: {
        height: '36px',
        backgroundColor: 'transparent',
        border: 0,
        padding: 0,
        color: 'black',
        strokeWidth: '2px',
      },
    },
    classNames: { control: classes.controlIcon },
  },
  controlGroup: {
    bg: 'transparent',
    styles: {
      controlsGroup: {
        borderRight: '1px solid #b2b2b2',
        height: '100%',
        padding: '0em .5rem',
      },
    },
  },
};
