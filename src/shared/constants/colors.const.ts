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
  White: '#ffffff',
  Gray: '#969696',
  Brown: '#8D5118',
  Black: '#000000',
  Pink: '#F4C1BE',
  Yellow: '#FFE605',
  Green: '#389B48',
  Red: '#DC362E',
  Orange: '#F39324',
  Purple: '#9747FF',
  Blue: '#4285F4',
};
