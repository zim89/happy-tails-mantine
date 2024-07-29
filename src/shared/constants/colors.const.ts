export const COLORS = [
  { name: 'White', hex: '#ffffff' },
  { name: 'Gray', hex: '#969696' },
  { name: 'Brown', hex: '#8D5118' },
  { name: 'Black', hex: '#000000' },
  { name: 'Pink', hex: '#F4C1BE' },
  { name: 'Yellow', hex: '#FFE605' },
  { name: 'Green', hex: '#389B48' },
  { name: 'Red', hex: '#DC362E' },
  { name: 'Orange', hex: '#F39324' },
  { name: 'Purple', hex: '#9747FF' },
  { name: 'Blue', hex: '#4285F4' },
] as const;

export const BG_COLORS: Record<string, string> = {
  White: 'bg-[#ffffff]',
  Gray: 'bg-[#969696]',
  Brown: 'bg-[#8D5118]',
  Black: 'bg-[#000000]',
  Pink: 'bg-[#F4C1BE]',
  Yellow: 'bg-[#FFE605]',
  Green: 'bg-[#389B48]',
  Red: 'bg-[#DC362E]',
  Orange: 'bg-[#F39324]',
  Purple: 'bg-[#9747FF]',
  Blue: 'bg-[#4285F4]',
};
