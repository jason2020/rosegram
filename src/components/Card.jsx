import React, { Component } from "react";
import PropTypes from "prop-types";
import styles from "./Card.module.css";

export default class Card extends Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  render() {
    const { stage } = this.props;
    return (
      <>
        {/* https://stackoverflow.com/questions/2941189/how-to-overlay-one-div-over-another-div */}
        <div id="cardContainer" className={styles.container}>
          <img
            alt="lol"
            style={{ height: "100%" }}
            src="https://cdn11.bigcommerce.com/s-zxbk4h26/images/stencil/1280x1280/products/111/327/CC-7875-xlg__59679.1430947336.jpg?c=2"
          />
          <p className={styles.overlay}>I &lt;3 YOU</p>
        </div>
      </>
    );
  }
}

Card.propTypes = {
  stage: PropTypes.number.isRequired,
};
