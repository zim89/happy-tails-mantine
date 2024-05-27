import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { Extension } from '@tiptap/react';
import { Node, mergeAttributes } from '@tiptap/core'

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

export const isContentEmptyOrShort = (input: string): boolean => {
  // This regex captures content inside editor
  const regex = /<p>([\s\S]*?)<\/p>/;
  const match = input.match(regex);

  if (match && match[1]) {
    // Check if the content is only whitespace or has less than 40 characters
    const content = match[1].trim();
    return content.length === 0 || content.length < 2;
  }

  return false;
}

export interface ImageResizeOptions {
  inline: boolean,
  allowBase64: boolean,
  HTMLAttributes: Record<string, any>,
  scaleFactor: 1,
}

declare module '@tiptap/core' {
  interface Commands<ReturnType> {
    image: {
      setImage: (options: { src: string, alt?: string, title?: string, width?: string, height?: string }) => ReturnType,
      resizeImage: (options: { scale: number }) => ReturnType,
    }
  }
}

let scaleVar = .4;

export const ImageResize = Node.create<ImageResizeOptions>({
  name: 'image',
  
  addOptions() {
    return {
      inline: false,
      allowBase64: false,
      HTMLAttributes: {},
      scaleFactor: 1,
    }
  },

  inline() {
    return this.options.inline
  },

  group() {
    return this.options.inline ? 'inline' : 'block'
  },

  draggable: true,

  addAttributes() {
    return {
      src: {
        default: null,
      },
      alt: {
        default: null,
      },
      title: {
        default: null,
      },
      scale: {
        default: 1
      }
    }
  },

  parseHTML() {
    return [
      {
        tag: this.options.allowBase64 ? 'img[src]' : 'img[src]:not([src^="data:"])',
      },
    ]
  },

  renderHTML({ HTMLAttributes }) {
    
    const style = scaleVar && scaleVar !== 1 
    ? `transform: scale(${scaleVar});` 
    : '';
    
    console.log("Inside renderHTML: ", style)
    
    return ['img', mergeAttributes(this.options.HTMLAttributes, HTMLAttributes, { style: `transform: scale(${scaleVar})` })]
  },

  addCommands() {
    return {
      setImage: options => ({ commands }) => {
        return commands.insertContent({
          type: this.name,
          attrs: options,
        })
      },
      resizeImage: (scale) => ({ state, commands }) => {
        const { selection } = state;
        const { from, to } = selection;
  
        state.doc.nodesBetween(from, to, (node, pos) => {
          if (node.type.name === 'image') {
            scaleVar = scale.scale; 

            return commands.updateAttributes('img', { style: `transform: scale(${scale.scale})` });
          }
        });

        return false;
      },
    }
  },
})