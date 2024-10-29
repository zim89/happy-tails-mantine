import jpg_icon from '/public/icons/files/file-jpg.png';
import pdf_icon from '/public/icons/files/file-pdf.png';
import png_icon from '/public/icons/files/file-png.png';
import gif_icon from '/public/icons/files/file-gif.png';
import webp_icon from '/public/icons/files/file-webp.png';
import type { StaticImageData } from 'next/image';

export type FileType = 'jpg' | 'jpeg' | 'pdf' | 'png' | 'gif' | 'webp';

export const FileTypeIcons: Record<FileType, StaticImageData> = {
  jpg: jpg_icon,
  jpeg: jpg_icon,
  pdf: pdf_icon,
  png: png_icon,
  gif: gif_icon,
  webp: webp_icon,
};
