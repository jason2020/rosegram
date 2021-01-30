import React, { Component } from "react";
import PropTypes from "prop-types";
import styles from "./Card.module.css";

export default class Card extends Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  render() {
    const { showCardContents, message } = this.props;
    return (
      <>
        <div
          className={`${styles.flipCard} ${showCardContents ? "active" : ""}`}
          style={{ margin: "5rem auto" }}
          // role="button"
          // tabIndex={0}
          // onClick={() =>
          //   this.setState((state) => ({
          //     showCardContents: !state.showCardContents,
          //   }))
          // }
          // onKeyDown={() =>
          //   this.setState((state) => ({
          //     showCardContents: !state.showCardContents,
          //   }))
          // }
        >
          <div
            className={styles.flipCardInner}
            style={{
              transform: showCardContents ? "rotateX(180deg)" : "none",
            }}
          >
            <div className={styles.flipCardFront}>
              <img
                src="https://ctl.s6img.com/society6/img/rF8sAD9XfXXrzD3ulg1drLHTTdk/w_700/duvet-covers/swatch/~artwork,fw_6001,fh_6001,fx_750,fy_750,iw_4499,ih_4499/s6-original-art-uploads/society6/uploads/misc/6430f731da624d68929c30f610a3224d/~~/valentines-day-card-funny-sloth-with-a-red-heart736939-duvet-covers.jpg"
                alt="Card Design"
                style={{ width: "500px", height: "500px" }}
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
  showCardContents: PropTypes.bool.isRequired,
};
