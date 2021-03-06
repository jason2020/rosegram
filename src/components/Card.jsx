import React, { Component } from "react";
import PropTypes from "prop-types";
import styles from "./Card.module.css";

export const designDictionary = {
  0: "/card-options/best-friends-day.png",
  1: "/card-options/better-together.png",
  2: "/card-options/eggcellent.png",
  3: "/card-options/galentines.png",
  4: "/card-options/hapea.png",
  5: "/card-options/lifes-sweeter-with-you.png",
  6: "/card-options/light-up-my-world.png",
  7: "/card-options/like-you-more-than-cats.png",
  8: "/card-options/like-you-more-than-dogs.png",
  9: "/card-options/loaf-you-so-much.png",
  10: "/card-options/make-everything-better.png",
  11: "/card-options/one-in-a-melon.png",
  12: "/card-options/simply-the-best.png",
  13: "/card-options/thanks-for-being-there.png",
  14: "/card-options/today-is-a-hug-day.png",
  15: "/card-options/ton-to-be-greatful.png",
  16: "/card-options/valentines-day-hearts.png",
  17: "/card-options/valentines-day-plants.png",
  18: "/card-options/valentines-day-stars.png",
  19: "/card-options/youre-the-coolest.png",
  20: "/card-options/thank-you.png",
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
              <img src={designDictionary[cardDesign]} alt="Card Design" style={{ width: "700px", height: "500px" }} />
            </div>
            <div className={`content ${styles.flipCardBack}`}>
              <p className={styles.previewMessage}>{message}</p>
            </div>
          </div>
        </div>
        <div>
          {/* Preload images in the beginning for faster context switching */}
          {/* img[src={designDictionary[$]} alt="" style={opacity: 0, width: 0}]*20 */}
          <img src={designDictionary[0]} alt="" style={{ opacity: 0, width: 0 }} />
          <img src={designDictionary[1]} alt="" style={{ opacity: 0, width: 0 }} />
          <img src={designDictionary[2]} alt="" style={{ opacity: 0, width: 0 }} />
          <img src={designDictionary[3]} alt="" style={{ opacity: 0, width: 0 }} />
          <img src={designDictionary[4]} alt="" style={{ opacity: 0, width: 0 }} />
          <img src={designDictionary[5]} alt="" style={{ opacity: 0, width: 0 }} />
          <img src={designDictionary[6]} alt="" style={{ opacity: 0, width: 0 }} />
          <img src={designDictionary[7]} alt="" style={{ opacity: 0, width: 0 }} />
          <img src={designDictionary[8]} alt="" style={{ opacity: 0, width: 0 }} />
          <img src={designDictionary[9]} alt="" style={{ opacity: 0, width: 0 }} />
          <img src={designDictionary[10]} alt="" style={{ opacity: 0, width: 0 }} />
          <img src={designDictionary[11]} alt="" style={{ opacity: 0, width: 0 }} />
          <img src={designDictionary[12]} alt="" style={{ opacity: 0, width: 0 }} />
          <img src={designDictionary[13]} alt="" style={{ opacity: 0, width: 0 }} />
          <img src={designDictionary[14]} alt="" style={{ opacity: 0, width: 0 }} />
          <img src={designDictionary[15]} alt="" style={{ opacity: 0, width: 0 }} />
          <img src={designDictionary[16]} alt="" style={{ opacity: 0, width: 0 }} />
          <img src={designDictionary[17]} alt="" style={{ opacity: 0, width: 0 }} />
          <img src={designDictionary[18]} alt="" style={{ opacity: 0, width: 0 }} />
          <img src={designDictionary[19]} alt="" style={{ opacity: 0, width: 0 }} />
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
