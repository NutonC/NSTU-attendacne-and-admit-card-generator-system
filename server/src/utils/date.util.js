function convertDateToISOstring(date) {
  return new Date(date).toISOString().split("T")[0];
}

function getNextDateISOstring(fromDate = new Date(), duration) {
  const day = fromDate;
  const fromDayISO = convertDateToISOstring(day);

  let nextDay = new Date(day);
  nextDay.setDate(day.getDate() + duration);

  const nextDayISO = convertDateToISOstring(nextDay);
  return {
    fromDayISO,
    nextDayISO,
  };
}

module.exports = {
  convertDateToISOstring,
  getNextDateISOstring,
};
