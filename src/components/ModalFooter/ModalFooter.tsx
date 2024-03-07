import { CSSProperties } from 'react';
import { Button } from '@mantine/core';

import styles from './ModalFooter.module.css';

type CommonProps = {
  primaryBtnText: string;
  primaryBtnOnClick: () => void;
  primaryBtnClassName?: string;
  containerStyles?: CSSProperties
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

type Props = CommonProps & (SingleButtonProps | DoubleButtonProps);

export default function ModalFooter(props: Props) {
  if (props.singleBtn) {
    return (
      <div className={styles.controls} style={props.containerStyles}>
        <Button
          classNames={{
            root: props.primaryBtnClassName || 'bg-black px-12 rounded-sm',
          }}
          onClick={props.primaryBtnOnClick}
        >
          {props.primaryBtnText}
        </Button>
      </div>
    );
  } else
    return (
      <div className={styles.controls} style={props.containerStyles}>
        <Button
          onClick={props.secondaryBtnOnClick}
          classNames={{
            root: props.secondaryBtnClassName || 'text-black border-1 border-[#EEE] px-12 mr-[42px] rounded-sm',
          }}
        >
          {props.secondaryBtnText}
        </Button>

        <Button
          classNames={{
            root: props.primaryBtnClassName || 'bg-black px-12 rounded-sm',
          }}
          onClick={props.primaryBtnOnClick}
        >
          {props.primaryBtnText}
        </Button>
      </div>
    );
};
