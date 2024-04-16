import { Stepper as MantineStepper, StepperStepProps, MantineComponent, StepperStylesNames } from '@mantine/core';
import React from 'react';

type Props = {
    active: number;
    setActive: (value: React.SetStateAction<number>) => void;
    children: (step: MantineComponent<{ props: StepperStepProps; ref: HTMLButtonElement; compound: true; stylesNames: StepperStylesNames; }>) => React.ReactNode
}
export default function Stepper({ active, setActive, children }: Props) {
  return (
    <>
      <MantineStepper active={active} onStepClick={setActive}>
        {children(MantineStepper.Step)}
      </MantineStepper>
    </>
  );
}