import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function readTextFileAsPromise(file: File) {
  return new Promise<string>((resolve, reject) => {
  
    const reader = new FileReader();

    reader.onload = () => {
      const text = reader.result;
      
      if (text == null) {
        reject('Parsing file failed!');
      } else {
        resolve(text.toString());
      }
    };

    reader.onerror = (error) => {
      reject(error);
    };

    reader.readAsText(file);
  });
} 