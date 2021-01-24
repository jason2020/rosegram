import React, { Component } from "react";
import PropTypes from "prop-types";
import styles from "./Card.module.css";

export default class Card extends Component {
  constructor(props) {
    super(props);

    this.state = {
      showCardContents: false, // T: show written message. F: show card front cover design. Default: F
    };
  }

  render() {
    const { stage, message } = this.props;
    const { showCardContents } = this.state;
    return (
      <>
        <div
          className={`${styles.flipCard} ${showCardContents ? "active" : ""}`}
          style={{ margin: "5rem auto" }}
          role="button"
          tabIndex={0}
          onClick={() =>
            this.setState((state) => ({
              showCardContents: !state.showCardContents,
            }))
          }
          onKeyDown={() =>
            this.setState((state) => ({
              showCardContents: !state.showCardContents,
            }))
          }
        >
          <div
            className={styles.flipCardInner}
            style={{
              transform: showCardContents ? "rotateX(180deg)" : "none",
            }}
          >
            <div className={styles.flipCardFront}>
              <img
                src="https://www.w3schools.com/howto/img_avatar.png"
                alt="Card Design"
                style={{ width: "300px", height: "300px" }}
              />
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
  stage: PropTypes.number.isRequired,
};
