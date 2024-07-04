export type PromoCodeStatus = 'ACTIVE' | 'COMPLETED';

export type PromoCode = {
  status: PromoCodeStatus;
  discount: number;
  minOrder: number;
  startDate: Date;
  expirationDate: Date;
  value: string;
};

export const codes: PromoCode[] = [
  {
    status: 'ACTIVE',
    discount: 5,
    minOrder: 10,
    startDate: new Date('2024-06-10'),
    expirationDate: new Date('2024-06-20'),
    value: 'RF123Y56',
  },
  {
    status: 'ACTIVE',
    discount: 5,
    minOrder: 10,
    startDate: new Date('2024-06-10'),
    expirationDate: new Date('2024-06-20'),
    value: 'RF123Y56',
  },
  {
    status: 'ACTIVE',
    discount: 5,
    minOrder: 10,
    startDate: new Date('2024-06-10'),
    expirationDate: new Date('2024-06-20'),
    value: 'RF123Y56',
  },
  {
    status: 'COMPLETED',
    discount: 5,
    minOrder: 10,
    startDate: new Date('2024-06-10'),
    expirationDate: new Date('2024-06-20'),
    value: 'RF123Y56',
  },
  {
    status: 'COMPLETED',
    discount: 5,
    minOrder: 10,
    startDate: new Date('2024-06-10'),
    expirationDate: new Date('2024-06-20'),
    value: 'RF123Y56',
  },
  {
    status: 'COMPLETED',
    discount: 5,
    minOrder: 10,
    startDate: new Date('2024-06-10'),
    expirationDate: new Date('2024-06-20'),
    value: 'RF123Y56',
  },
];
