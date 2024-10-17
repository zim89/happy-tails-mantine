export const isOverviewEmpty = (param: string | null | undefined) => {
  return !param || param.length < 1 || param === 'EMPTY';
};
