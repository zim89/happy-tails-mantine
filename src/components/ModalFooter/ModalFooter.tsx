import { CSSProperties } from 'react';

import styles from './ModalFooter.module.css';

type CommonProps = {
  primaryBtnText: string;
  primaryBtnOnClick: () => void;
  primaryBtnClassName?: string;
  containerStyles?: CSSProperties;
};

type SingleButtonProps = {
  singleBtn: true;
};

type DoubleButtonProps = {
  singleBtn: false;
  secondaryBtnText: string;
  secondaryBtnOnClick: () => void;
  secondaryBtnClassName?: string;
};

export type Props = CommonProps & (SingleButtonProps | DoubleButtonProps);

export default function ModalFooter(props: Props) {
  if (props.singleBtn) {
    return (
      <div className={styles.controls} style={props.containerStyles}>
        <span
          is='button'
          className={props.primaryBtnClassName || 'rounded-sm bg-black px-12 text-white py-2 cursor-pointer'}
          onClick={props.primaryBtnOnClick}
        >
          {props.primaryBtnText}
        </span>
      </div>
    );
  } else
    return (
      <div className={styles.controls} style={props.containerStyles}>
        <span
          is='button'
          onClick={props.secondaryBtnOnClick}
          className={
            props.secondaryBtnClassName ||
            'mr-[42px] rounded-sm border-2 border-[#EEE] px-12 py-2 text-black cursor-pointer'
          }
        >
          {props.secondaryBtnText}
        </span>

        <span
          is='button'
          className={props.primaryBtnClassName || 'rounded-sm bg-black px-12 text-white py-2 cursor-pointer'}
          onClick={props.primaryBtnOnClick}
        >
          {props.primaryBtnText}
        </span>
      </div>
    );
}
