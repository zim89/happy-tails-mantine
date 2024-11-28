'use client';

import { useRichTextEditorContext } from '@mantine/tiptap';
import { UnstyledButton } from '@mantine/core';
import { Sparkles } from 'lucide-react';
import { useState } from 'react';
import axios from 'axios';

import { sharedProps } from '@/modules/EditorTemplate/lib/shared-props';
import { SITE_DOMAIN } from '@/shared/constants/env.const';
import Loader from '../Loader';

type Props = {
  options: {
    validate: () => boolean;
    input: string;
    onFinish?: (res: string) => void;
  };
};

export const FancyControl = ({ options }: Props) => {
  const { editor } = useRichTextEditorContext();
  const [isLoading, setIsLoading] = useState(false);

  const handleClick = async () => {
    try {
      const isValid = options.validate();

      if (!isValid) {
        return;
      }

      setIsLoading(true);

      const res = await axios.post(
        `${process.env.NODE_ENV !== 'production' ? 'http://localhost:3000' : SITE_DOMAIN}/api/generate`,
        {
          message: options.input,
        }
      );

      const data = res.data;
      editor?.commands.setContent(data);

      if (options.onFinish) {
        options.onFinish(data);
      }

      setIsLoading(false);
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <>
      <UnstyledButton
        data-testid='option-button'
        title='Generate content'
        styles={{ root: sharedProps.toolbarBtn.styles.control }}
        onClick={handleClick}
      >
        {isLoading ? (
          <Loader size={16} className='mr-[6px] p-0' />
        ) : (
          <Sparkles
            width={16}
            height={16}
            className='mx-[2px]'
            strokeWidth={1.5}
          />
        )}
      </UnstyledButton>
    </>
  );
};
