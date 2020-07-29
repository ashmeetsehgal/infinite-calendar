import React, { Component } from "react";
import PropTypes from "prop-types";

import _isEmpty from "lodash/isEmpty";

import storage from "../../Utils/storage";
import helper from "../../Utils";

import "./reminder.scss";

const errors = {
  NAME_ERROR: "Name can't be empty",
  TIME_ERROR: "End time can't be less than or equal to start time"
};

export default class Reminder extends Component {
  static propTypes = {
    prop: PropTypes
  };

  state = {
    name: "",
    startTime: "",
    endTime: "",
    error: ""
  };

  handleChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  submitReminder = event => {
    event.preventDefault();
    const { onClose, date } = this.props;
    const { startTime, endTime, name } = this.state;
    if (_isEmpty(name)) {
      this.setState({
        error: errors.NAME_ERROR
      });
      return;
    } else if (
      _isEmpty(startTime) ||
      _isEmpty(endTime) ||
      startTime > endTime
    ) {
      this.setState({
        error: errors.TIME_ERROR
      });
      return;
    }
    storage.addReminder({ ...this.state, id: helper.getDateAsId(date) });
    onClose();
  };

  render() {
    const { date, onClose } = this.props;
    const { error } = this.state;
    return (
      <div className="reminder-wrapper">
        <h2>Create Event for {date}</h2>
        <form>
          <div className="field">
            <label>Name</label>
            <input
              maxLength={16}
              onChange={this.handleChange}
              name="name"
              type="text"
            />
          </div>
          <div className="time">
            <div className="field">
              <label>Start</label>
              <input
                onChange={this.handleChange}
                name="startTime"
                type="time"
              />
            </div>
            <div className="field">
              <label>End</label>
              <input onChange={this.handleChange} name="endTime" type="time" />
            </div>
          </div>
          <div className="error-wrapper">
            {!_isEmpty(error) && (
              <span class="error-wrapper__label">{error}</span>
            )}
          </div>
          <div className="field">
            <button onClick={this.submitReminder}>Save Event</button>
            <button onClick={onClose}>Close</button>
          </div>
        </form>
      </div>
    );
  }
}
