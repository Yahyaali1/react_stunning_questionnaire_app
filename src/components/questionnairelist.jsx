import React, { Component } from "react";
import strings from "../shared/strings";
import datakeys from "../shared/datakeys";
/**
 * Questionnaire List
 * props
 * questionnaire list
 * onclick handler for each questionnaire
 */
class QuestionnaireList extends Component {
  handleOpenQuestionnaire = id => {
    const { handleQuestionnaire } = this.props;
    handleQuestionnaire(id);
  };
  renderQuestionnaireList = () => {
    const { data } = this.props;
    return (
      <ul className="list-group">
        {data.length > 0 ? (
          data.map((item, i) => {
            return (
              <li
                key={i}
                className="list-group-item list-group-item-action"
                onClick={() => {
                  this.handleOpenQuestionnaire(
                    item[datakeys.KEY_QUESTIONNAIRE_ID]
                  );
                }}
              >
                {item[datakeys.KEY_TITLE]}
              </li>
            );
          })
        ) : (
          <div>{strings.NO_QUESTIONNAIRE_TEXT}</div>
        )}
      </ul>
    );
  };
  render() {
    return (
      <div className="card shadow-sm m-3 ">
        <div className="card-body">
          <h5 className="card-title">{strings.TITLE_QUESTIONNAIRE}</h5>
          <p className="card-text">{strings.DESCRIPTION_QUESTIONNAIRE}</p>
          {this.renderQuestionnaireList()}
        </div>
      </div>
    );
  }
}
QuestionnaireList.defaultProps = {
  data: []
};
export { QuestionnaireList };
