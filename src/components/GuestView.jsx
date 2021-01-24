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
   * Stage 1: initial display of card. Next Step: user clicks "Open Card"
   * Stage 2: user sees card contents. Next Step: user clicks "Close Card"
   * Stage 3: done. display option to write your own card to the user (take them to the homepage)
   */
  constructor(props) {
    super(props);

    this.state = {
      stage: 1,
      message: "",
      // receiver: "",
      // sender: "",
    };

    this.handleClick = this.handleClick.bind(this); // https://stackoverflow.com/questions/32317154/react-uncaught-typeerror-cannot-read-property-setstate-of-undefined
  }

  componentDidMount() {
    // TODO switch to async await
    // Get Card URL ID from React Router
    // eslint-disable-next-line react/prop-types, react/destructuring-assignment
    const { cardUrl } = this.props.match.params;
    // Fetch card from API
    const api = axios.create({ baseURL: process.env.REACT_APP_BACKEND_DOMAIN });
    api
      .get(`/cards/${cardUrl}`)
      .then((res) => {
        this.setState({ message: res.data.message });
      })
      .catch((err) => {
        console.log(err.response);
        // TODO take user to error page
      });
  }

  handleClick() {
    this.setState((state) => ({
      stage: state.stage + 1,
    }));
  }

  render() {
    // Conditionally render components based on what stage we are on
    const { stage, message } = this.state;

    return (
      <>
        <div className="container has-text-centered">
          <Card stage={stage} message={message} />
          {/* See GetStarted.jsx for more info in clickable divs in React */}
          <div
            role="button"
            tabIndex={0}
            onClick={this.handleClick}
            onKeyDown={this.handleClick}
            style={{ outlineWidth: 0 }}
          >
            <AwesomeButton type="primary">Open</AwesomeButton>
          </div>
        </div>
      </>
    );
  }
}
