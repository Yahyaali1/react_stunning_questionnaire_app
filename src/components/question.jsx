import React, { Component } from "react";
import strings from "../shared/strings";
import datakeys from "../shared/datakeys";
/**
 * Question component for rendering answers and question text
 * props:
 * {Question list}
 * {Handler for on click question}
 */
class Question extends Component {
  submitAnswer = id => {
    const { handleQuestionResponse } = this.props;
    handleQuestionResponse(id);
  };

  startOverAgain = () => {
    const { resetApp } = this.props;
    resetApp();
  };
  renderLastItem = () => {
    return (
      <div>
        <div>{strings.NO_ANSWER_TEXT}</div>
        <div className="text-right">
          <a
            href="#"
            onClick={() => {
              this.startOverAgain();
            }}
            className="btn btn-primary"
          >
            {strings.TRY_ANOTHER}
          </a>
        </div>
      </div>
    );
  };
  renderAnswerList = () => {
    const { data } = this.props;
    const { answers } = data;

    return (
      <ul className="list-group">
        {answers.length > 0
          ? answers.map((item, i) => {
              return (
                <li
                  key={i}
                  className="list-group-item list-group-item-action"
                  onClick={() => {
                    this.submitAnswer(item[datakeys.KEY_ANSWER_ID]);
                  }}
                >
                  {item[datakeys.KEY_ANSWER_TEXT]}
                </li>
              );
            })
          : this.renderLastItem()}
      </ul>
    );
  };

  render() {
    const { data } = this.props;
    return (
      <div className="card shadow-sm m-3 ">
        <div className="card-body">
          <h5 className="card-title">{strings.TITLE_QUESTION}</h5>
          <p className="card-text">
            {data[datakeys.KEY_QUESTION_TEXT]
              ? data[datakeys.KEY_QUESTION_TEXT]
              : strings.ERROR_QUESTION_TEXT}
          </p>
          {this.renderAnswerList()}
        </div>
      </div>
    );
  }
}
Question.defaultProps = {
  data: {
    [datakeys.KEY_QUESTION_TEXT]: strings.WE_ARE_SORRY,
    [datakeys.KEY_ANSWERS]: []
  }
};
export { Question };
