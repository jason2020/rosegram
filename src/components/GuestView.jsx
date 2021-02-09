import React, { Component } from "react";
import { AwesomeButton } from "react-awesome-button";
import axios from "axios";
import Card from "./Card";

/*
 * This is a main view component. A "guest" comes to this website to view a card that someone else wrote for them.
 * React Router takes them to this page (component).
 */
export default class GuestView extends Component {
  /*
   * Stage 0: send API call to backend to retrieve card details
   * Stage 1: initial display of card. Next Step: user clicks "Open Card"
   * Stage 2: user sees card contents. Next Step: user clicks "Close Card"
   * Stage 3: done. display option to write your own card to the user (take them to the homepage)
   */
  constructor(props) {
    super(props);

    this.state = {
      stage: 0,
      message: "",
      showCardContents: false,
      cardDesign: 0,
      // receiver: "",
      // sender: "",
    };
  }

  componentDidMount() {
    // Get Card URL ID from React Router
    // eslint-disable-next-line react/prop-types, react/destructuring-assignment
    const { cardUrl } = this.props.match.params;
    // Fetch card from API
    const api = axios.create({ baseURL: process.env.REACT_APP_BACKEND_DOMAIN || "/api" });
    api
      .get(`/cards/${cardUrl}`)
      .then((res) => {
        this.setState({ stage: 1, message: res.data.message, cardDesign: +res.data.cardDesign });
      })
      .catch((err) => {
        console.log(err, err.response);

        // Redirect to 404 page
        window.location.href = "/404";
      });
  }

  render() {
    // Conditionally render components based on what stage we are on
    const { stage, message, showCardContents, cardDesign } = this.state;

    return (
      <>
        <div className="container has-text-centered">
          <div style={{ display: stage === 0 ? "none" : "initial" }}>
            <Card showCardContents={showCardContents} message={message} cardDesign={cardDesign} />
          </div>

          <AwesomeButton
            type="primary"
            className="awesome-button"
            onPress={() =>
              this.setState((state) => ({
                stage: state.stage + 1,
                showCardContents: true,
              }))
            }
            style={{ display: stage === 1 ? "initial" : "none" }}
          >
            Open
          </AwesomeButton>

          <AwesomeButton
            className="awesome-button"
            type="primary"
            style={{ display: stage === 2 ? "initial" : "none" }}
            onPress={() => this.setState((state) => ({ showCardContents: !state.showCardContents }))}
          >
            Flip Card
          </AwesomeButton>
        </div>
      </>
    );
  }
}
