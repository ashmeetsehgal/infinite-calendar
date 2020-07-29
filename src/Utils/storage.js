import _get from "lodash/get";

function addReminder(data) {
  window.localStorage.reminders = JSON.stringify({ [data.id]: data });
}

function getReminderByDate(date) {
  return JSON.parse(_get(window.localStorage.getItem("reminders"), date)) || "";
}

export default {
  addReminder,
  getReminderByDate
};
