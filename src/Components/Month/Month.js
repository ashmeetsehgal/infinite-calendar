import React, { PureComponent } from "react";
import PropTypes from "prop-types";

import CalendarHeader from "../CalendarHeader";
import CalendarBody from "../CalendarBody";
import helper from "../../Utils";

export default class Month extends PureComponent {
  static propTypes = {
    month: PropTypes.string.isRequired
  };

  render() {
    const { month } = this.props;
    return (
      <div id={helper.getDateAsId(month)}>
        <CalendarHeader month={month} />
        <CalendarBody month={month}></CalendarBody>
      </div>
    );
  }
}
