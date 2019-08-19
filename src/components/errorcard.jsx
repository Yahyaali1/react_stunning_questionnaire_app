import React from "react";
import strings from "../shared/strings";
import datakeys from "../shared/datakeys";

const ErrorCard = ({ data, resetApp }) => {
  return (
    <div className="card shadow-sm m-3 text-center ">
      <h5 className="card-header">{data[datakeys.KEY_TITLE]}</h5>
      <div className="card-body">
        <h5 className="card-title">{data[datakeys.KEY_DESCRIPTION]}</h5>
        <p className="card-text">{data[datakeys.KEY_LONG_DESCRIPTION]}</p>
        <a
          href="#"
          onClick={() => {
            resetApp();
          }}
          className="btn btn-primary"
        >
          {strings.GET_OUT}
        </a>
      </div>
    </div>
  );
};

export { ErrorCard };
