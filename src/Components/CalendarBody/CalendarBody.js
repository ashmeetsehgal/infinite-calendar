import React, { Component } from "react";
import PropTypes from "prop-types";

import Day from "../Day";
import helper from "../../Utils";

import "./calendarBody.scss";

export default class CalendarBody extends Component {
  static propTypes = {
    month: PropTypes.string.isRequired
  };

  buildDays() {
    const { month } = this.props;
    const noOfDays = helper.getNumberOfDaysInMonth(month);
    const days = [];
    const props = {};
    for (let i = 1; i <= noOfDays; i++) {
      let date = `${month}-${("0" + i).slice(-2)}`;

      if (i === 1) {
        props["firstDayIndex"] = helper.getStartDay(date);
      } else {
        delete props["firstDayIndex"];
      }

      days.push(<Day key={i} date={date} day={i} {...props} />);
    }

    return days;
  }

  render() {
    return <section className="days">{this.buildDays()}</section>;
  }
}
