import React, { Component } from "react";
import PropTypes from "prop-types";
// import Modal from "react-modal";
import Modal from "react-awesome-modal";
import Reader from "./memo.reader";

import storage from "../../Utils/storage";
import helper from "../../Utils";
import Reminder from "../Reminder";

import "./day.scss";

export default class Day extends Component {
  static propTypes = {
    firstDayIndex: PropTypes.string,
    day: PropTypes.number.isRequired
  };

  static defaultProps = {
    firstDayIndex: undefined
  };

  state = {
    modalIsOpen: false
  };

  toggleModal = () => {
    this.setState({ modalIsOpen: !this.state.modalIsOpen });
  };

  buildReminderMemo = () => {
    const { date } = this.props;
    const reminder = storage.getReminderByDate(helper.getDateAsId(date));
    const { name, startTime, endTime } = Reader.getMemoInfo(reminder);
    if (!name) return;
    return (
      <div className="memo">
        {startTime && (
          <span>
            {startTime} - {endTime} {"   "}
          </span>
        )}
        <span>{name}</span>
      </div>
    );
  };

  render() {
    const { day, firstDayIndex, date } = this.props;
    const { modalIsOpen } = this.state;
    const cssClasses = firstDayIndex
      ? `day first-index-${firstDayIndex}`
      : "day";

    return (
      <div className={cssClasses}>
        <header>{day}</header>
        {this.buildReminderMemo()}
        <button className="btn-new-reminder" onClick={this.toggleModal}>
          add reminder
        </button>
        {modalIsOpen && (
          <Modal
            visible={modalIsOpen}
            width="450"
            height="auto"
            effect="fadeInUp"
            onClickAway={this.toggleModal}
          >
            <Reminder date={date} onClose={this.toggleModal} />
          </Modal>
        )}
      </div>
    );
  }
}
