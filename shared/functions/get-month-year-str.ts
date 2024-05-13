export const getMonthYearStr = (date: Date | null) => {
  const _date = new Date(date as Date);

  const _month = _date.toLocaleDateString("default", {
    month: "long"
  });
  const _year = _date.getFullYear();
  const _monthYear = `${_month}, ${_year}`;

  return _monthYear;
};
