import React, { Component } from "react";
import PropTypes from "prop-types";
import styles from "./Card.module.css";

export const CARD_DESIGNS = {
};

export default class Card extends Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  render() {
    const { showCardContents, message, cardDesign } = this.props;
    return (
      <>
        <div className={`${styles.flipCard} ${showCardContents ? "active" : ""}`} style={{ margin: "5rem auto" }}>
          <div
            className={styles.flipCardInner}
            style={{
              transform: showCardContents ? "rotateX(180deg)" : "none",
            }}
          >
            <div className={styles.flipCardFront}>
              <img src={CARD_DESIGNS[cardDesign]} alt="Card Design" style={{ width: "500px", height: "500px" }} />
            </div>
            <div className={`content ${styles.flipCardBack}`}>
              <p className={styles.previewMessage}>{message}</p>
            </div>
          </div>
        </div>
      </>
    );
  }
}

Card.propTypes = {
  showCardContents: PropTypes.bool.isRequired,
  message: PropTypes.string.isRequired,
  cardDesign: PropTypes.number.isRequired,
};
