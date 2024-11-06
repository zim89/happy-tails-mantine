import { useRichTextEditorContext } from '@mantine/tiptap';
import { Menu, UnstyledButton } from '@mantine/core';
import { Type } from 'lucide-react';

import { sharedProps } from '@/modules/EditorTemplate/lib/shared-props';
import { fonts } from './lib/fonts';

export default function FontFamilyControl() {
  const { editor } = useRichTextEditorContext();

  return (
    <Menu>
      <Menu.Target>
        <UnstyledButton
          data-testid='option-button'
          aria-label='Font'
          title='Font'
          styles={{ root: sharedProps.toolbarBtn.styles.control }}
        >
          <Type width={26} height={15} strokeWidth={2.5} />
        </UnstyledButton>
      </Menu.Target>

      <Menu.Dropdown>
        {fonts.map((font) => (
          <Menu.Item
            key={font.id}
            className={font.className}
            onClick={() => {
              editor?.commands.setFont(font.value);
            }}
          >
            {font.label}
          </Menu.Item>
        ))}
      </Menu.Dropdown>
    </Menu>
  );
}
