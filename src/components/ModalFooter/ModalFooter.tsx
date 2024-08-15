import { CSSProperties, MouseEventHandler } from 'react';

import styles from './ModalFooter.module.css';

type CommonProps = {
  primaryBtnText: string;
  primaryBtnOnClick: MouseEventHandler<HTMLSpanElement>;
  primaryBtnClassName?: string;
  containerStyles?: CSSProperties;
};

type SingleButtonProps = {
  singleBtn: true;
};

type DoubleButtonProps = {
  singleBtn: false;
  secondaryBtnText: string;
  secondaryBtnOnClick: MouseEventHandler<HTMLSpanElement>;
  secondaryBtnClassName?: string;
};

export type Props = CommonProps & (SingleButtonProps | DoubleButtonProps);

export default function ModalFooter(props: Props) {
  if (props.singleBtn) {
    return (
      <div
        className={styles.controls}
        style={props.containerStyles}
        data-testid='modal-footer'
      >
        <span
          data-testid='single-button'
          is='button'
          className={
            props.primaryBtnClassName ||
            'cursor-pointer rounded-sm bg-secondary px-12 py-2 text-primary'
          }
          onClick={(e) => props.primaryBtnOnClick(e)}
        >
          {props.primaryBtnText}
        </span>
      </div>
    );
  } else
    return (
      <div
        className={styles.controls}
        style={props.containerStyles}
        data-testid='modal-footer'
      >
        <span
          data-testid='secondary-button'
          is='button'
          onClick={props.secondaryBtnOnClick}
          className={
            props.secondaryBtnClassName ||
            'mr-[42px] cursor-pointer rounded-sm border-2 border-brand-grey-300 px-12 py-2 text-secondary'
          }
        >
          {props.secondaryBtnText}
        </span>

        <span
          is='button'
          data-testid='primary-button'
          className={
            props.primaryBtnClassName ||
            'cursor-pointer rounded-sm bg-secondary px-12 py-2 text-primary'
          }
          onClick={(e) => props.primaryBtnOnClick(e)}
        >
          {props.primaryBtnText}
        </span>
      </div>
    );
}
