import axios from "axios";
import datakeys from "./datakeys";
import strings from "./strings";

const BASE_URL = "http://127.0.0.1:8000";
const FETCH_QUESTIONNAIRES = "/questionnaire/fetch";
const FETCH_FIRST_QUESTION = "/questionnaire/submit/";
const SUBMIT_QUESTION = "/questionnaire/submit";
axios.defaults.withCredentials = true;

axios.interceptors.response.use(
  response => {
    // do something with the response data
    console.log("Response was received");

    return response;
  },
  error => {
    if (error.response) {
      /*
       * The request was made and the server responded with a
       * status code that falls out of the range of 2xx
       */
      error = getErrorObject(
        strings.WE_ARE_SORRY,
        error.response.status,
        error.response.data[datakeys.KEY_ERROR]
      );
    } else if (error.request) {
      /*
       * The request was made but no response was received, `error.request`
       * is an instance of XMLHttpRequest in the browser and an instance
       * of http.ClientRequest in Node.js
       */
      error = getErrorObject(strings.WE_ARE_SORRY, strings.SERVER_DOWN);
      console.log(error.request);
    } else {
      // Something happened in setting up the request and triggered an Error
      error = getErrorObject(
        strings.WE_ARE_SORRY,
        strings.BAD_REQUEST,
        strings.SERVER_DOWN
      );
    }
    return Promise.reject(error);
  }
);

export const fetchQuestionnaires = (onSuccess, onFailure) => {
  axios
    .get(BASE_URL + FETCH_QUESTIONNAIRES)
    .then(response => {
      onSuccess(response.data);
    })
    .catch(error => {
      onFailure(error);
    });
};

export const fetchQuestion = (questionnaireId, onSuccess, onFailure) => {
  axios
    .get(BASE_URL + FETCH_FIRST_QUESTION + questionnaireId)
    .then(response => {
      onSuccess(response.data);
    })
    .catch(error => {
      onFailure(error);
    });
};

export const submitQuestionResponse = (
  { questionnaireId, questionId, answerId },
  onSuccess,
  onFailure
) => {
  const url =
    BASE_URL +
    SUBMIT_QUESTION +
    `/${questionnaireId}/${questionId}/${answerId}`;
  axios
    .get(url)
    .then(response => {
      onSuccess(response.data);
    })
    .catch(error => {
      onFailure(error);
    });
};
const INITAL_STATE_ERROR_OBJECT = {
  [datakeys.KEY_TITLE]: "",
  [datakeys.KEY_DESCRIPTION]: "",
  [datakeys.KEY_LONG_DESCRIPTION]: ""
};
const getErrorObject = (title = "", description = "", longDescription = "") => {
  const data = { ...INITAL_STATE_ERROR_OBJECT };
  data[datakeys.KEY_TITLE] = title;
  data[datakeys.KEY_DESCRIPTION] = description;
  data[datakeys.KEY_LONG_DESCRIPTION] = longDescription;
  return data;
};
