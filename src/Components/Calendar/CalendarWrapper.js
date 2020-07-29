import React, { PureComponent, Fragment } from "react";
import _map from "lodash/map";
import _last from "lodash/last";
import _head from "lodash/head";

import Month from "../Month";
import helper from "../../Utils";

import "./calendarWrapper.scss";

export default class Calendar extends PureComponent {
  constructor() {
    super();
    this.startingRef = React.createRef();
    this.endingRef = React.createRef();
    this.currentMonth = helper.getCurrentMonth();
    this.state = {
      monthList: [this.currentMonth, helper.getNextMonth(this.currentMonth)]
    };

    this.intersactionObserver = new IntersectionObserver(
      this.intersactionCallback,
      {}
    );
  }

  componentDidMount() {
    window.scrollTo("90px", this.startingRef.current.offsetTop);
    this.intersactionObserver.observe(this.startingRef.current);
    this.intersactionObserver.observe(this.endingRef.current);
  }

  componentWillUnmount() {
    this.intersactionObserver.disconnect();
  }

  getNewMonthList = entry => {
    const { monthList } = this.state;
    const divId = entry.target && entry.target.getAttribute("id");
    const newMonthList =
      divId === "start"
        ? [...helper.getPrevMonths(_head(monthList)), ...monthList]
        : [...monthList, ...helper.getNextMonths(_last(monthList))];
    this.setState({ monthList: newMonthList });
  };

  intersactionCallback = entries => {
    entries.forEach(entry => {
      if (entry.intersectionRatio * 100 > 0) {
        this.getNewMonthList(entry);
      } else {
        // this.unMountChildren();
      }
    });
  };

  showMonths = () => {
    const { monthList } = this.state;
    return _map(monthList, month => <Month key={month} month={month} />);
  };

  scrollToCurrentMonth = () => {
    const currentMonthNode = document.getElementById(
      helper.getDateAsId(this.currentMonth)
    );
    window.scrollTo(0, currentMonthNode.offsetTop);
  };

  render() {
    return (
      <Fragment>
        <div id="start" ref={this.startingRef}></div>
        <button className="goToButton" onClick={this.scrollToCurrentMonth}>
          Current Month
        </button>
        {this.showMonths()}
        <div id="end" ref={this.endingRef}></div>
      </Fragment>
    );
  }
}
