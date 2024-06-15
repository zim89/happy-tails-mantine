const monthMap: { [P: number]: string } = {
  0: 'Jan',
  1: 'Feb',
  2: 'Mar',
  3: 'Apr',
  4: 'May',
  5: 'Jun',
  6: 'Jul',
  7: 'Aug',
  8: 'Sep',
  9: 'Oct',
  10: 'Nov',
  11: 'Dec',
};

export const reversedMonthMap: { [P: string]: number } = {
  January: 0,
  February: 1,
  March: 2,
  April: 3,
  May: 4,
  June: 5,
  July: 6,
  August: 7,
  September: 8,
  October: 9,
  November: 10,
  December: 11,
};

interface MonthlyData {
  name: string;
  days: { label: number; revenue: number }[];
  total: number;
}

function generateMonthlyData(month: string, total: number): MonthlyData {
  const daysInMonth = month === 'Jan' ? 31 : 28; // Simplified for example
  const mean = total / daysInMonth;
  const stdDev = 100; // You can adjust this value for more/less variability

  const randomGaussian = (): number => {
    let u = 0,
      v = 0;
    while (u === 0) u = Math.random(); // Converting [0,1) to (0,1)
    while (v === 0) v = Math.random();
    return Math.sqrt(-2.0 * Math.log(u)) * Math.cos(2.0 * Math.PI * v);
  };

  let days: MonthlyData['days'] = Array.from(
    { length: daysInMonth },
    (_, index: number) => {
      return {
        label: index + 1,
        revenue: mean + randomGaussian() * stdDev,
      };
    }
  );
  const sumDays = days.reduce((a, b) => a + b.revenue, 0);

  days = days.map((day) => ({
    label: day.label,
    revenue: Math.round((day.revenue / sumDays) * total),
  }));
  const sumAdjustedDays = days.reduce((a, b) => a + b.revenue, 0);
  days[days.length - 1].revenue += total - sumAdjustedDays; // Adjust last value to match total

  return {
    name: month,
    days: days,
    total: total,
  };
}

export const monthlyData: MonthlyData[] = Array(12)
  .fill(null)
  .map(() => Math.round(Math.random() * 350000) + 50000)
  .map((revenue, index) => generateMonthlyData(monthMap[index], revenue));
