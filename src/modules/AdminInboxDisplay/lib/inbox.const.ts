export const FILTER_OPTIONS = [
  {
    id: 0,
    title: 'All',
    value: 'All',
  },
  {
    id: 2,
    title: 'Read',
    value: 'Read',
  },
  {
    id: 3,
    title: 'Unread',
    value: 'Unread',
    columnFilter: 'status',
  },
  {
    id: 4,
    title: 'Starred',
    value: 'Starred',
  },
  {
    id: 5,
    title: 'Unstarred',
    value: 'Unstarred',
  },
] as const;

export const BADGE_PALETTE: {
  [P in string]: string;
} = {
  NEW: '#4285F4',
  REVIEWING: '#B4B4B4',
  RESOLVED: '#389B48',
};
