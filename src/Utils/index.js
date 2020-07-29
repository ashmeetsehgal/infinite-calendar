import moment from "moment";

function getNameOfDays() {
  return moment.weekdaysShort();
}

function getNumberOfDaysInMonth(month) {
  return moment(month).daysInMonth();
}

function getCurrentMonth() {
  return moment().format("YYYY-MM");
}

function getMonthAndYear(month) {
  return moment(month).format("MMMM YYYY");
}

function getStartDay(date) {
  return moment(date)
    .startOf("month")
    .format("d");
}

function getNextMonth(currentMonth) {
  return moment(currentMonth)
    .add(1, "M")
    .format("YYYY-MM");
}

function getPrevMonth(currentMonth) {
  return moment(currentMonth)
    .subtract(1, "M")
    .format("YYYY-MM");
}

function getPrevMonths(currentMonth, noOfMonths = 5) {
  let months = [];
  for (let i = noOfMonths; i >= 1; i--) {
    months.push(
      moment(currentMonth)
        .subtract(i, "M")
        .format("YYYY-MM")
    );
  }
  return months;
}

function getNextMonths(currentMonth, noOfMonths = 5) {
  let months = [];
  for (let i = 1; i <= noOfMonths; i++) {
    months.push(
      moment(currentMonth)
        .add(i, "M")
        .format("YYYY-MM")
    );
  }
  return months;
}

function getDateAsId(date) {
  return date.split("-").join("_");
}

export default {
  getNameOfDays,
  getCurrentMonth,
  getNumberOfDaysInMonth,
  getStartDay,
  getMonthAndYear,
  getNextMonth,
  getPrevMonth,
  getNextMonths,
  getPrevMonths,
  getDateAsId
};
