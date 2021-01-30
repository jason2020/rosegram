import React from "react";
import PropTypes from "prop-types";
import { AwesomeButton } from "react-awesome-button";

export default function GetStarted({ handleClick }) {
  // https://stackoverflow.com/questions/54274473/how-to-fix-static-html-elements-with-event-handlers-require-a-role
  // https://stackoverflow.com/questions/48575674/how-to-add-a-keyboard-listener-to-my-onclick-handler
  return (
    <div role="button" tabIndex={0} onClick={handleClick} onKeyDown={handleClick}>
      <AwesomeButton className="awesome-button" type="primary">
        Get Started &#x2192;
      </AwesomeButton>
    </div>
  );
}

GetStarted.propTypes = {
  handleClick: PropTypes.func.isRequired,
};
