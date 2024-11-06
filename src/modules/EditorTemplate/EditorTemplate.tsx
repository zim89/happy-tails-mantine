import classes from './classes.module.css';

import { RichTextEditor, RichTextEditorStylesNames } from '@mantine/tiptap';
import { sharedProps } from './lib/shared-props';
import { Editor } from '@tiptap/react';
import FontSizeControl from '@/components/FontSizeControl';
import FontFamilyControl from '@/components/FontFamilyControl';
import ImageControl from '@/components/ImageControl';
import { cn } from '@/shared/lib/utils';

type TextEditor = {
  kind: 'text';
  editor: Editor;
  classNames?: Partial<{
    [P in RichTextEditorStylesNames]: string;
  }>;
};

type MultiModalEditor = {
  kind: 'multi';
  editor: Editor;
  handleImageUpload: (file: File) => Promise<string | null>;
  classNames?: Partial<{
    [P in RichTextEditorStylesNames]: string;
  }>;
};

type Props = TextEditor | MultiModalEditor;

export const EditorTemplate = (props: Props) => {
  return (
    <RichTextEditor
      editor={props.editor}
      classNames={{
        ...props.classNames,
        root: cn(classes.editorContent, props.classNames?.root),
      }}
    >
      <RichTextEditor.Toolbar
        styles={{
          toolbar: {
            backgroundColor: '#C8C8C8',
            gap: 0,
            padding: '0 0.5em',
          },
        }}
      >
        <RichTextEditor.ControlsGroup {...sharedProps.controlGroup}>
          <FontSizeControl />
        </RichTextEditor.ControlsGroup>
        <RichTextEditor.ControlsGroup {...sharedProps.controlGroup}>
          <FontFamilyControl />
          <RichTextEditor.ColorPicker
            colors={[
              '#25262b',
              '#868e96',
              '#fa5252',
              '#e64980',
              '#be4bdb',
              '#7950f2',
              '#4c6ef5',
              '#228be6',
              '#15aabf',
              '#12b886',
              '#40c057',
              '#82c91e',
              '#fab005',
              '#fd7e14',
            ]}
            style={sharedProps.toolbarBtn.styles.control}
          />

          <RichTextEditor.Bold {...sharedProps.toolbarBtn} />
          <RichTextEditor.Italic {...sharedProps.toolbarBtn} />
          <RichTextEditor.Underline {...sharedProps.toolbarBtn} />
          <RichTextEditor.Strikethrough {...sharedProps.toolbarBtn} />
        </RichTextEditor.ControlsGroup>

        <RichTextEditor.ControlsGroup {...sharedProps.controlGroup}>
          <RichTextEditor.AlignLeft {...sharedProps.toolbarBtn} />
          <RichTextEditor.AlignCenter {...sharedProps.toolbarBtn} />
          <RichTextEditor.AlignJustify {...sharedProps.toolbarBtn} />
          <RichTextEditor.AlignRight {...sharedProps.toolbarBtn} />
        </RichTextEditor.ControlsGroup>

        <RichTextEditor.ControlsGroup {...sharedProps.controlGroup}>
          <RichTextEditor.OrderedList {...sharedProps.toolbarBtn} />
          <RichTextEditor.BulletList {...sharedProps.toolbarBtn} />
          <RichTextEditor.ControlsGroup />
        </RichTextEditor.ControlsGroup>

        <RichTextEditor.ControlsGroup {...sharedProps.controlGroup}>
          {props.kind === 'multi' && (
            <ImageControl handleImageUpload={props.handleImageUpload} />
          )}
          <RichTextEditor.Link {...sharedProps.toolbarBtn} />
        </RichTextEditor.ControlsGroup>
      </RichTextEditor.Toolbar>
      <RichTextEditor.Content />
    </RichTextEditor>
  );
};
