import { Select } from '@mantine/core';
import { useRichTextEditorContext } from '@mantine/tiptap';
import { ChevronDown } from 'lucide-react';

export const FontSizeControl = () => {
    const { editor } = useRichTextEditorContext();

    return (
        <Select
            title="Font size"
            aria-label="Font size"
            allowDeselect={false}
            classNames={{
                input:
                    'max-w-[26px] p-0 bg-transparent border-0 font-black form-input',
                dropdown: 'min-w-20',
                section: "-mr-[16px]"
            }}
            defaultValue={'14'}
            onChange={(e) => e && editor?.commands.setFontSize(e)}
            data={['8', '10', '12', '14', '16', '18', '20']}
            rightSection={<ChevronDown size={8} style={{ strokeWidth: "4px" }} color='black' />}
        />
    );
}