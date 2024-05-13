export const getFirstDateOfMonthsAgo = (monthsAgo: number): Date => {
  const date = new Date();
  date.setMonth(date.getMonth() - monthsAgo);
  date.setDate(1);
  return date;
};
