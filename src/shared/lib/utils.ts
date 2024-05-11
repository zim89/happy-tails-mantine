import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { Extension } from '@tiptap/react';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

declare module '@tiptap/core' {
  interface Commands<ReturnType> {
    fontSize: {
      /**
       * Set the font size
       */
      setFontSize: (size: string) => ReturnType;
      /**
       * Unset the font size
       */
      unsetFontSize: () => ReturnType;
    };
    font: {
      /**
       * Set a font family
       */
      setFont: (font: string) => ReturnType;
    };
  }
}

export const FontFamily = Extension.create({
  name: 'font-family',

  addOptions() {
    return {
      types: ['textStyle'],
      lastFamily: ""
    };
  },

  addGlobalAttributes() {
    return [
      {
        types: this.options.types,
        attributes: {
          fontFamily: {
            default: null,
            parseHTML: (element) => [
              { style: element.style.fontFamily?.replace(/['"]+/g, '') },
            ],
            renderHTML: (attributes) => {
              this.options.lastFamily = attributes.fontFamily || "";
              if (!attributes.fontFamily) {
                return {};
              }

              return {
                style: `font-family: ${attributes.fontFamily}`,
              };
            },
          },
        },
      },
    ];
  },

  addCommands() {
    return {
      setFont:
        (fontFamily) =>
        ({ chain }) => {
          if (fontFamily === this.options.lastFamily) return chain().toggleMark('textStyle', { fontFamily: null }).run();
          return chain().setMark('textStyle', { fontFamily }).run();
        }
    };
  },
});

export const FontSize = Extension.create({
  name: 'fontSize',
  addOptions() {
    return {
      types: ['textStyle'],
    };
  },
  addGlobalAttributes() {
    return [
      {
        types: this.options.types,
        attributes: {
          fontSize: {
            default: null,
            parseHTML: (element) =>
              element.style.fontSize.replace(/['"]+/g, ''),
            renderHTML: (attributes) => {
              if (!attributes.fontSize) {
                return {};
              }
              return {
                style: `font-size: ${attributes.fontSize}`,
              };
            },
          },
        },
      },
    ];
  },
  addCommands() {
    return {
      setFontSize:
        (fontSize) =>
        ({ chain }) => {
          return chain()
            .setMark('textStyle', { fontSize: fontSize + 'px' })
            .run();
        },
      unsetFontSize:
        () =>
        ({ chain }) => {
          return chain()
            .setMark('textStyle', { fontSize: null })
            .removeEmptyTextStyle()
            .run();
        },
    };
  },
});
