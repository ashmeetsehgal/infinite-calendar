import React, { Fragment } from "react";
import PropTypes from "prop-types";

import _map from "lodash/map";

import helper from "../../Utils";

import "./calendarHeader.scss";

const CalenderHeader = ({ month }) => (
  <Fragment>
    <div className="header">{helper.getMonthAndYear(month)}</div>
    <div className="weekdays">
      {_map(helper.getNameOfDays(), (day, i) => (
        <strong key={i}>{day}</strong>
      ))}
    </div>
  </Fragment>
);

CalenderHeader.propsTypes = {
  month: PropTypes.string.isRequired
};

export default CalenderHeader;
