import React, { Component, Fragment } from "react";
import logo from "./logo.svg";

import {
  NavBar,
  QuestionnaireList,
  Question,
  Loader,
  ErrorCard
} from "../src/components/index";

import strings from "../src/shared/strings";
import datakeys from "../src/shared/datakeys";
import {
  fetchQuestionnaires,
  fetchQuestion,
  submitQuestionResponse
} from "..//src//shared//networklayer";

const INITAL_STATE = {
  questionnaireList: [],
  isLoading: true,
  questionData: {},
  loadQuestion: false,
  hasError: false,
  errorData: {
    title: "",
    descirption: "",
    longDesciption: ""
  }
};
class App extends Component {
  state = { ...INITAL_STATE };

  componentDidMount() {
    fetchQuestionnaires(this.onSuccessQuestionnaireList, error => {
      this.setErrorState(error);
    });
  }

  setErrorState = error => {
    this.hideLoader();
    this.setState({
      hasError: true,
      errorData: error
    });
  };
  resetApp = () => {
    this.setState({ ...INITAL_STATE });
    fetchQuestionnaires(this.onSuccessQuestionnaireList, error => {
      this.setErrorState(error);
    });
  };
  onSuccessQuestionnaireList = data => {
    this.setState({
      questionnaireList: data,
      isLoading: false,
      loadQuestion: false
    });
  };

  onSuccessQuestionData = data => {
    this.setState({
      questionData: data,
      isLoading: false,
      loadQuestion: true
    });
  };

  handleQuestionnaire = questionnaireId => {
    this.showLoader();
    fetchQuestion(questionnaireId, this.onSuccessQuestionData, error => {
      this.setErrorState(error);
    });
  };
  /**
   * handleQuestion Response: Calls api to function to fetch next question
   * data
   */
  handleQuestionResponse = id => {
    const { questionData } = this.state;
    this.showLoader();
    submitQuestionResponse(
      {
        questionnaireId: questionData[datakeys.KEY_QUESTIONNAIRE_ID],
        questionId: questionData[datakeys.KEY_QUESTION_ID],
        answerId: id
      },
      this.onSuccessQuestionData,
      error => {
        this.setErrorState(error);
      }
    );
  };
  showLoader = () => {
    this.setState({
      isLoading: true
    });
  };
  hideLoader = () => {
    this.setState({
      isLoading: false
    });
  };
  renderErrorCard = () => {
    const { errorData } = this.state;
    return <ErrorCard resetApp={this.resetApp} data={errorData} />;
  };
  renderLoader = () => {
    return <Loader />;
  };
  /**
   * handleQuestionResponse: function is attached with each row item
   */
  renderQuestion = () => {
    return (
      <Question
        data={this.state.questionData}
        handleQuestionResponse={this.handleQuestionResponse}
        resetApp={this.resetApp}
      />
    );
  };
  /**
   * handleQuestionnaire: function is attached with each row item
   */
  renderQuestionnaireList = () => {
    return (
      <QuestionnaireList
        data={this.state.questionnaireList}
        handleQuestionnaire={this.handleQuestionnaire}
      />
    );
  };

  /**
   * Calls respective function to render different view based on the state values.
   */
  renderContent = () => {
    const { isLoading, loadQuestion, hasError } = this.state;
    return isLoading
      ? this.renderLoader()
      : hasError
      ? this.renderErrorCard()
      : loadQuestion
      ? this.renderQuestion()
      : this.renderQuestionnaireList();
  };
  render() {
    return (
      <Fragment>
        <NavBar title={strings.TITLE} />
        <div className="container">{this.renderContent()}</div>
      </Fragment>
    );
  }
}

export default App;
