import React from "react";
import PropTypes from "prop-types";
import { AwesomeButton } from "react-awesome-button";

export default function StageButton({ handleClick, message, showArrow = true, disabled = false }) {
  // https://stackoverflow.com/questions/54274473/how-to-fix-static-html-elements-with-event-handlers-require-a-role
  // https://stackoverflow.com/questions/48575674/how-to-add-a-keyboard-listener-to-my-onclick-handler
  return (
    <AwesomeButton
      className="awesome-button"
      type="primary"
      onPress={handleClick}
      style={{ opacity: disabled ? "0" : "1" }}
    >
      {message} {showArrow ? "\u2192" : ""}
    </AwesomeButton>
  );
}

StageButton.propTypes = {
  handleClick: PropTypes.func.isRequired,
  message: PropTypes.string.isRequired,
  showArrow: PropTypes.bool,
  disabled: PropTypes.bool,
};

StageButton.defaultProps = {
  showArrow: true,
  disabled: false,
};
