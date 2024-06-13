export type FilterTypes = 'clicks' | 'impressions' | 'ctr' | 'position';

export const COLORS: { [P in FilterTypes]: string } = {
  clicks: '#4285F4',
  impressions: '#328C41',
  ctr: '#DB8420',
  position: '#000000',
};

type FilterDataType = {
  id: number;
  type: 'Decimal' | 'Percent';
  name: FilterTypes;
  color: string;
  label: string;
  additionalColor: string;
  precision: number;
};
export const filtersData: FilterDataType[] = [
  {
    id: 0,
    type: 'Decimal',
    name: 'clicks',
    color: '#E3EDFD',
    label: 'Total clicks',
    additionalColor: '#4285F4',
    precision: 0,
  },
  {
    id: 1,
    type: 'Decimal',
    name: 'impressions',
    color: '#E1F0E4',
    label: 'Total impressions',
    additionalColor: '#328C41',
    precision: 0,
  },
  {
    id: 2,
    type: 'Percent',
    name: 'ctr',
    color: '#FDEFDE',
    label: 'Average CTR',
    additionalColor: '#DB8420',
    precision: 1,
  },
  {
    id: 3,
    type: 'Decimal',
    name: 'position',
    color: '#F7F7F7',
    label: 'Average position',
    additionalColor: '#000000',
    precision: 0,
  },
];
