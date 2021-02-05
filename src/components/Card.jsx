import React, { Component } from "react";
import PropTypes from "prop-types";
import styles from "./Card.module.css";

export const CARD_DESIGNS = {
  0: "https://ctl.s6img.com/society6/img/rF8sAD9XfXXrzD3ulg1drLHTTdk/w_700/duvet-covers/swatch/~artwork,fw_6001,fh_6001,fx_750,fy_750,iw_4499,ih_4499/s6-original-art-uploads/society6/uploads/misc/6430f731da624d68929c30f610a3224d/~~/valentines-day-card-funny-sloth-with-a-red-heart736939-duvet-covers.jpg",
  1: "https://www.purplecare.com/assets/content/content-v3-duplicate-bg.jpg",
  2: "https://i.guim.co.uk/img/media/d0105731685e5b2b3daecf2fa00c9affaba832f1/0_0_2560_1536/master/2560.jpg?width=1200&height=900&quality=85&auto=format&fit=crop&s=813bbc6e03dae66c2d041b98615ea63c",
  3: "https://www.vettedpetcare.com/vetted-blog/wp-content/uploads/2017/09/How-To-Travel-With-a-Super-Anxious-Cat-square.jpeg",
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
