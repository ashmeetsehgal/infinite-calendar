import _get from "lodash/get";

function getMemoInfo(reminder) {
  const name = _get(reminder, "name", "");
  const startTime = _get(reminder, "startTime", "");
  const endTime = _get(reminder, "endTime", "");
  return {
    name,
    startTime,
    endTime
  };
}

export default {
  getMemoInfo
};
