export const getPreviousYears = (fromYear, yearGap) => {
  let resultYears = [];
  const toYear = fromYear - yearGap;
  for (let i = toYear; i <= fromYear; i++) {
    resultYears.push(i);
  }

  return resultYears;
};
