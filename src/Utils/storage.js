const readFromLocalStorage = key => {
  let result;
  result = localStorage[key] || "";

  if (result.startsWith("{") || result.startsWith("[")) {
    result = JSON.parse(result);
  }

  return result;
};

const writeToLocalStorage = (key, value) => {
  localStorage[key] = typeof value === "string" ? value : JSON.stringify(value);
};

function addReminder(data) {
  return writeToLocalStorage(data.id, data);
}

function getReminderByDate(date) {
  return readFromLocalStorage(date);
}

export default {
  addReminder,
  getReminderByDate
};
